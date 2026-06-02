<?php


namespace App\Http\Controllers;


use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreEventRequest;


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
            ->with(['category'])
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
    public function getOrganizerEvents(Request $request)
    {
        $query = $request->user()
            ->organizedEvents()
            ->with(['category'])
            ->withCount('registrations')
            ->latest();

        // Filter by search query
        $query->when($request->query('search'), function ($q, $search) {
            return $q->where('title', 'LIKE', "%{$search}%");
        });

        // Filter by category
        $query->when($request->query('category_id'), function ($q, $categoryId) {
            return $q->where('category_id', $categoryId);
        });

        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $events = $query->paginate(8);

        return response()->json([
            'status' => 'success',
            'data' => $events
        ], 200);
    }


    public function store(StoreEventRequest $request)
    {
        $validatedData = $request->validated();




        $event = $request->user()->organizedEvents()->create($validatedData);


        // 4. Trả về phản hồi thành công
        return response()->json([
            'success' => true,
            'message' => 'Create event successfully!',
            'data'    => $event
        ], 201);
    }


    public function show(Request $request, $id)
    {


        $event = $request->user()->organizedEvents()->withCount('registrations')->find($id);


        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }


        return response()->json([
            'status' => 'success',
            'data' => $event
        ], 200);
    }


    public function update(Request $request, $id)
    {


        $event = $request->user()->organizedEvents()->find($id);


        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }


        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:draft,published,cancelled',
            'capacity' => 'sometimes|nullable|integer|min:1'
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $event->update($validator->validated());


        return response()->json([
            'status' => 'success',
            'message' => 'Event updated successfully',
            'data' => $event
        ], 200);
    }


    public function destroy(Request $request, $id)
    {
        $event = $request->user()->organizedEvents()->find($id);




        if (!$event) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }




        // Only allow deletion of draft events
        if ($event->status !== 'draft') {
            return response()->json([
                'status' => 'error',
                'message' => 'Only draft events can be deleted'
            ], 403);
        }




        $eventTitle = $event->title;

        // SỬ DỤNG forceDelete() ĐỂ XÓA VĨNH VIỄN KHỎI DATABASE
        $event->forceDelete();




        return response()->json([
            'status' => 'success',
            'message' => 'Draft event permanently deleted',
            'data' => ['title' => $eventTitle]
        ], 200);
    }




    public function showPublic($id)
    {
        $event = Event::with(['category'])->withCount('registrations')->find($id);


        if (!$event || $event->status === 'draft') {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found'
            ], 404);
        }


        if ($event->status === 'published') {
            return response()->json([
                'status' => 'success',
                'data' => $event
            ], 200);
        }


        // Nếu event không phải 'published' (ví dụ: 'ended', 'cancelled'), yêu cầu phải đăng nhập
        $user = auth('sanctum')->user();
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }


        // Kiểm tra xem người dùng hiện tại có phải là người tạo sự kiện (organizer)
        // hoặc đã đăng ký tham gia sự kiện (attendee) hay không
        $isOrganizer = $event->organizer_id === $user->id;
        $isRegistered = $event->registrations()->where('user_id', $user->id)->exists();


        if (!$isOrganizer && !$isRegistered) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event not found or unauthorized'
            ], 404);
        }


        return response()->json([
            'status' => 'success',
            'data' => $event
        ], 200);
    }


    public function index(\Illuminate\Http\Request $request)
    {
        $categoryId = $request->query('category_id');
        $search = $request->query('search');
        $limit = $request->query('limit');

        if (!empty($search) && mb_strlen(trim($search), 'UTF-8') < 4) {
            return response()->json([
                'success' => true,
                'data'    => []
            ], 200);
        }

        $query = Event::with(['organizer:id,name', 'category'])
            ->withCount('registrations')
            ->where('status', 'published')
            ->where('end_time', '>=', now())
            ->orderBy('start_time', 'asc');

        $query->when($categoryId, function ($q) use ($categoryId) {
            return $q->where('category_id', $categoryId);
        });

        $query->when($search, function ($q) use ($search) {
            return $q->where(function ($subQuery) use ($search) {
                $subQuery->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        });

        if ($limit) {
            $events = $query->take($limit)->get();
        } else {
            $events = $query->get();
        }

        return response()->json([
            'success' => true,
            'data'    => $events
        ], 200);
    }


    public function categories()
    {
        $categories = \App\Models\Category::select('id', 'name')->get();


        return response()->json([
            'success' => true,
            'data'    => $categories
        ]);
    }


    public function cancel($id)
    {
        $event = Event::where('id', $id)
            ->where('organizer_id', auth()->id())
            ->first();


        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found or you do not have permission.'
            ], 404);
        }


        $event->status = 'cancelled';
        $event->save();


        return response()->json([
            'success' => true,
            'message' => 'Event cancelled successfully',
            'data' => $event
        ]);
    }
};
