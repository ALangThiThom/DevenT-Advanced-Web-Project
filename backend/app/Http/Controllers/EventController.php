<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('organizer:id,name')
                       ->where('status', 'Published')
                       ->orderBy('date_time', 'asc')
                       ->get();

        return response()->json([
            'success' => true,
            'data'    => $events
        ]);
    }
    public function categories()
    {
        $categories = Event::where('status', 'Published')
                           ->distinct()
                           ->pluck('category');

        return response()->json([
            'success' => true,
            'data'    => $categories
        ]);
    }
}