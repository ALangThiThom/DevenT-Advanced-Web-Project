<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function index(Request $request)
    {
        $user = $request->user();

        $events = $user->organizedEvents()
            ->withCount('registrations')
            ->latest()
            ->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $events
        ], 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:draft,published,cancelled',
            'capacity' => 'nullable|integer|min:1',
            'category' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $event = $request->user()->organizedEvents()->create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Event created successfully',
            'data' => $event
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

        $event->update($request->all());

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

        $event->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Event deleted successfully'
        ], 200);
    }
}
