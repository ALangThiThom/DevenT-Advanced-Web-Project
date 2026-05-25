<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
| These routes do not require authentication. They are accessible to everyone.
*/

// Traditional Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Google OAuth Authentication
Route::get('/auth/google/url', [AuthController::class, 'getGoogleAuthUrl']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Public Event Browsing
Route::get('/events', [EventController::class, 'index']);
Route::get('/categories', [EventController::class, 'categories']);
Route::get('/events/{id}', [EventController::class, 'showPublic']);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
| These routes require a valid Sanctum access token to access.
*/
Route::middleware('auth:sanctum')->group(function () {

    // Return current authenticated user profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Support both POST and DELETE for logout depending on frontend implementation
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/logout', [AuthController::class, 'logout']);

    /*
     * Organizer-only Routes
     * Restricted by 'role:organizer' middleware to ensure regular attendees
     * cannot create, modify, or view organizer-specific dashboards.
     */
    Route::middleware('role:organizer')->prefix('organizer')->group(function () {
        Route::get('/dashboard-stats', [EventController::class, 'dashboardStats']);
        Route::get('/events', [EventController::class, 'getOrganizerEvents']);
        Route::patch('/events/{id}/cancel', [EventController::class, 'cancel']);
        Route::apiResource('events', EventController::class)->except(['index']);
    });

    /*
     * Attendee-only Routes
     * Reserved for actions specific to regular users.
     */
    Route::middleware('role:attendee')->prefix('attendee')->group(function () {
        // TODO: Add attendee specific routes here (e.g., event registration, ticket viewing)
    });
});
