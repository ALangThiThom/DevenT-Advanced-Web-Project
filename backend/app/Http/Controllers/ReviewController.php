<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

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
}
