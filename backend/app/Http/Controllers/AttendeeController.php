<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AttendeeController extends Controller
{
    public function registeredEvents(Request $request)
    {
        $events = $request->user()
            ->registrations()
            ->whereIn('registrations.status', ['confirmed', 'waitlisted'])
            ->join('events', 'registrations.event_id', '=', 'events.id')
            ->where('events.status', 'published')
            ->select(
                'events.*',
                'registrations.status as registration_status',
                \DB::raw('(SELECT COUNT(*) FROM registrations r WHERE r.event_id = events.id AND r.status != "cancelled") as registrations_count')
            )
            ->get()
            ->map(function ($event) {
                $event->category = \App\Models\Category::find($event->category_id);
                return $event;
            });

        return response()->json($events);
    }

    public function finishedEvents(Request $request)
    {
        $events = $request->user()
            ->registrations()
            ->where('registrations.status', 'confirmed')
            ->join('events', 'registrations.event_id', '=', 'events.id')
            ->where('events.status', 'ended')
            ->select('events.*', 'registrations.status as registration_status')
            ->get()
            ->map(function ($event) {
                $event->category = \App\Models\Category::find($event->category_id);
                return $event;
            });

        return response()->json($events);
    }

    public function cancelledEvents(Request $request)
    {
        $events = $request->user()
            ->registrations()
            ->join('events', 'registrations.event_id', '=', 'events.id')
            ->where(function ($query) {
                $query->where('registrations.status', 'cancelled')
                    ->orWhere('events.status', 'cancelled');
            })
            ->select('events.*', 'registrations.status as registration_status')
            ->get()
            ->map(function ($event) {
                $event->category = \App\Models\Category::find($event->category_id);
                return $event;
            });

        return response()->json($events);
    }
}
