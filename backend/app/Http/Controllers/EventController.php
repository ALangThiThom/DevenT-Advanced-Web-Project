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
            'success' => true, // Thêm trạng thái đồng bộ với các hàm trên
            'data'    => $events   // Đảm bảo bọc trong trường data chuẩn để React hốt trọn bộ
        ], 200);
    }

    public function categories()
    {
        $categories = Event::where('status', 'published')
                           ->distinct()
                           ->pluck('category');

        return response()->json([
            'success' => true,
            'data'    => $categories
        ]);
    }
}