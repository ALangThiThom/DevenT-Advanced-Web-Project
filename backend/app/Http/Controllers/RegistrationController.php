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
            if (!empty($event->capacity) && $event->capacity > 0) {
                if ($event->registered_count >= $event->capacity) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'This event has reached its maximum capacity.'
                    ], 400);
                }
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
}
