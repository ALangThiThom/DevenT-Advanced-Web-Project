<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    /**
     * Store a newly created registration.
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);

        $user = $request->user();
        $eventId = $request->event_id;

        $event = Event::find($eventId);

        if ($event->status !== 'published') {
            return response()->json([
                'status' => 'error',
                'message' => 'This event is not published.'
            ], 400);
        }

        // Limit Restriction: One registration per user per event
        $alreadyRegistered = Registration::where('user_id', $user->id)
            ->where('event_id', $event->id)
            ->exists();

        if ($alreadyRegistered) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already registered for this event.'
            ], 400);
        }

        // Use transaction and pessimistic locking to handle concurrent requests
        return DB::transaction(function () use ($user, $eventId) {
            $event = Event::lockForUpdate()->find($eventId);

            // Capacity Check
            if ($event->registered_count >= $event->capacity) {

                $lastQueuePosition = Registration::where('event_id', $event->id)
                    ->where('status', 'waitlisted')
                    ->max('queue_position');

                $newQueuePosition = ($lastQueuePosition ?? 0) + 1;

                $registration = Registration::create([
                    'user_id' => $user->id,
                    'event_id' => $event->id,
                    'status' => 'waitlisted',
                    'queue_position' => $newQueuePosition,
                ]);

                return response()->json([
                    'status' => 'success',
                    'message' => "You are #{$newQueuePosition} in the waitlist.",
                    'data' => $registration
                ], 201);
            }

            // Create registration
            $registration = Registration::create([
                'user_id' => $user->id,
                'event_id' => $event->id,
                'status' => 'confirmed',
            ]);

            // Increment registered count
            $event->increment('registered_count');

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully registered for the event.',
                'data' => $registration
            ], 201);
        });
    }
    public function cancel(Request $request, $eventId)
    {
        $user = $request->user();

        return DB::transaction(function () use ($user, $eventId) {

            $registration = Registration::where('user_id', $user->id)
                ->where('event_id', $eventId)
                ->first();

            if (!$registration) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Registration not found.'
                ], 404);
            }

            $event = Event::lockForUpdate()->find($eventId);

            // Nếu là confirmed user
            if ($registration->status === 'confirmed') {

                $event->decrement('registered_count');

                // Tìm người đầu waitlist
                $nextWaitlisted = Registration::where('event_id', $eventId)
                    ->where('status', 'waitlisted')
                    ->orderBy('queue_position', 'asc')
                    ->first();

                // Promote lên confirmed
                if ($nextWaitlisted) {

                    $nextWaitlisted->update([
                        'status' => 'confirmed',
                        'queue_position' => null,
                    ]);

                    $event->increment('registered_count');

                    // Update lại queue
                    $remainingWaitlist = Registration::where('event_id', $eventId)
                        ->where('status', 'waitlisted')
                        ->orderBy('queue_position')
                        ->get();

                    foreach ($remainingWaitlist as $index => $waitlistedUser) {
                        $waitlistedUser->update([
                            'queue_position' => $index + 1
                        ]);
                    }
                }
            }

            // Nếu user đang waitlist
            if ($registration->status === 'waitlisted') {

                $registration->update([
                    'status' => 'cancelled'
                ]);

                // Update queue lại
                $remainingWaitlist = Registration::where('event_id', $eventId)
                    ->where('status', 'waitlisted')
                    ->orderBy('queue_position')
                    ->get();

                foreach ($remainingWaitlist as $index => $waitlistedUser) {
                    $waitlistedUser->update([
                        'queue_position' => $index + 1
                    ]);
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Waitlist registration cancelled.'
                ]);
            }

            // Cancel confirmed registration
            $registration->update([
                'status' => 'cancelled'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registration cancelled successfully.'
            ]);
        });
    }
}
