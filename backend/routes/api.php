<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::delete('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// --- Public routes cho Homepage ---
Route::get('/events',     [EventController::class, 'index']);
Route::get('/categories', [EventController::class, 'categories']);

// Public event detail route (only non-draft events will be visible)
Route::get('/events/{id}', [EventController::class, 'showPublic']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:organizer')->prefix('organizer')->group(function () {
        
        Route::post('/events', [EventController::class, 'store']);

        Route::get('/dashboard-stats', [EventController::class, 'dashboardStats']);

        Route::apiResource('events', EventController::class);
    });

    Route::middleware('role:attendee')->prefix('attendee')->group(function () {

    });
});
