<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

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
