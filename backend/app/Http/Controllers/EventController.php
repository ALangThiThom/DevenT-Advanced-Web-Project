<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreEventRequest;

class EventController extends Controller
{

    public function dashboardStats(Request $request)
    {
        $user = $request->user();

        $totalEvents = $user->organizedEvents()->count();

        $activeEvents = $user->organizedEvents()->where('status', 'published')->count();

        $totalRegistrations = $user->organizedEvents()
            ->join('registrations', 'events.id', '=', 'registrations.event_id')
            ->count();

        $recentEvents = $user->organizedEvents()
            ->withCount('registrations')
            ->latest()
            ->take(4)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'stats' => [
                    'total_events' => $totalEvents,
                    'active_events' => $activeEvents,
                    'total_registrations' => $totalRegistrations,
                ],
                'recent_events' => $recentEvents
            ]
        ], 200);
    }
    public function getOrganizerEvents(Request $request)
    {
        $query = $request->user()
            ->organizedEvents()
            ->withCount('registrations')
            ->latest();

        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $events = $query->paginate(8);

        return response()->json([
            'status' => 'success',
            'data' => $events
        ], 200);
    }

    public function store(StoreEventRequest $request)
    {
        $validatedData = $request->validated();


        $event = $request->user()->organizedEvents()->create($validatedData);

        // 4. Trả về phản hồi thành công
        return response()->json([
            'success' => true,
            'message' => 'Create event successfully!',
            'data'    => $event
        ], 201);
    }

    public function show(Request $request, $id)
    {

        $event = $request->user()->organizedEvents()->withCount('registrations')->find($id);

        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $event
        ], 200);
    }

    public function update(Request $request, $id)
    {

        $event = $request->user()->organizedEvents()->find($id);

        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:draft,published,cancelled',
            'capacity' => 'sometimes|nullable|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $event->update($validator->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Event updated successfully',
            'data' => $event
        ], 200);
    }

    public function destroy(Request $request, $id)
    {

        $event = $request->user()->organizedEvents()->find($id);

        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }

        $event->update(['status' => 'cancelled']);

        return response()->json([
            'status' => 'success',
            'message' => 'Cancel event successfully',
            'data' => $event
        ], 200);
    }

    /**
     * Public show for event details. Only non-draft events are visible publicly.
     */
    public function showPublic($id)
    {
        $event = Event::withCount('registrations')->find($id);

        if (!$event || $event->status === 'draft') {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $event
        ], 200);
    }

    public function index()
    {
        $events = Event::with('organizer:id,name')
            ->where('status', 'published')
            ->orderBy('start_time', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $events
        ], 200);
    }

    public function categories()
    {
        $categories = \App\Models\Category::select('id', 'name')->get();

        return response()->json([
            'success' => true,
            'data'    => $categories
        ]);
    }
}
