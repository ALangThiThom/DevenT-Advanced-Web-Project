<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Event;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of reviews for a specific event.
     */
    public function index($id)
    {
        $reviews = Review::with('user:id,name') // Loading user relationship (id and name)
            ->where('event_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reviews
        ], 200);
    }

    /**
     * Store a newly created review in storage.
     */
    public function store(Request $request, $id)
    {
        // 1. Validation
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:300',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        // 2. Authorization: Check if user is an attendee
        if ($user->role !== 'attendee') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only attendees can submit reviews.'
            ], 403);
        }

        // 3. Business Logic
        $event = Event::find($id);
        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found.'
            ], 404);
        }

        // a) Check if event status is 'ended'
        if ($event->status !== 'ended') {
            return response()->json([
                'status' => 'error',
                'message' => 'You can only review events that have ended.'
            ], 400);
        }

        // b) Check if user has a confirmed registration
        $registration = Registration::where('user_id', $user->id)
            ->where('event_id', $id)
            ->where('status', 'confirmed')
            ->first();

        if (!$registration) {
            return response()->json([
                'status' => 'error',
                'message' => 'You must have a confirmed registration to review this event.'
            ], 403);
        }

        // c) STRICT CHECK: Prevent duplicate reviews
        $existingReview = Review::where('user_id', $user->id)
            ->where('event_id', $id)
            ->exists();

        if ($existingReview) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already submitted a review for this event.'
            ], 400);
        }

        // 4. Save the review
        $review = Review::create([
            'user_id' => $user->id,
            'event_id' => $id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        // Load user name for frontend consistency
        $review->load('user:id,name');

        return response()->json([
            'status' => 'success',
            'message' => 'Review submitted successfully.',
            'data' => $review
        ], 201);
    }
}
