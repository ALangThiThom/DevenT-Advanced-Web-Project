<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:organizer')->prefix('organizer')->group(function () {

        Route::get('/dashboard-stats', [EventController::class, 'dashboardStats']);

        Route::apiResource('events', EventController::class);
    });

    Route::middleware('role:attendee')->prefix('attendee')->group(function () {

    });
});
