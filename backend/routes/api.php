<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('role:organizer')->prefix('organizer')->group(function () {
        Route::get('/dashboard-stats', function (Request $request) {
            return response()->json([
                'message' => 'role: organizer',
                'user' => $request->user(),
                'stats' => [
                    'total_events' => $request->user()->organizedEvents()->count(),
                    'active_events' => $request->user()->organizedEvents()->where('status', 'published')->count(),
                ]
            ]);
        });
    });

    Route::middleware('role:attendee')->prefix('attendee')->group(function () {
        //
    });
});
