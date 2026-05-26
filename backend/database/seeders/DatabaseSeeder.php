<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Category;
use App\Models\Registration;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Review::truncate();
        Registration::truncate();
        Event::truncate();
        Category::truncate();
        User::truncate();
        Schema::enableForeignKeyConstraints();

        // 2. TẠO CATEGORIES
        $categoryNames = ['Music', 'Sports', 'Food', 'Art', 'Education', 'Community'];
        $categoryIds = [];
        foreach ($categoryNames as $catName) {
            $category = Category::create(['name' => $catName]);
            $categoryIds[$catName] = $category->id;
        }

        // 3. TẠO USERS
        $organizer = User::create([
            'email' => 'organizer@dev.com',
            'name' => 'Developer Organizer',
            'password' => Hash::make('password123'),
            'role' => 'organizer',
        ]);

        $attendees = [];
        for ($i = 1; $i <= 10; $i++) {
            $attendees[] = User::create([
                'name' => "Attendee User $i",
                'email' => "attendee{$i}@dev.com",
                'password' => Hash::make('password123'),
                'role' => 'attendee',
            ]);
        }
        $attendeesCollection = collect($attendees);

        // 4. TẠO 15 EVENTS
        $eventsData = [
            // Sự kiện này sẽ được chỉnh để "Sold Out" ở dưới
            ['title' => 'Neon Nights Music Festival', 'description' => 'An immersive electronic music journey.', 'category_id' => $categoryIds['Music'], 'location' => 'Skyline Stadium', 'start_time' => '2026-10-24 19:00:00', 'end_time' => '2026-10-24 22:00:00', 'capacity' => 10, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'City Marathon', 'description' => 'Challenge yourself on this scenic coastal route.', 'category_id' => $categoryIds['Sports'], 'location' => 'Central Park', 'start_time' => '2026-10-28 05:30:00', 'end_time' => '2026-10-28 11:30:00', 'capacity' => 500, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Pasta Making Workshop', 'description' => 'Learn traditional pasta making from local chefs.', 'category_id' => $categoryIds['Food'], 'location' => 'The Kitchen Lab', 'start_time' => '2026-11-15 18:30:00', 'end_time' => '2026-11-15 21:30:00', 'capacity' => 30, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Modern Lacquer Art Expo', 'description' => 'Contemporary art exhibition featuring unique lacquer works.', 'category_id' => $categoryIds['Art'], 'location' => 'Fine Arts Museum', 'start_time' => '2026-11-20 09:00:00', 'end_time' => '2026-11-20 17:00:00', 'capacity' => 100, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Future Tech Conference', 'description' => 'Exploring the next decade of innovation.', 'category_id' => $categoryIds['Education'], 'location' => 'Convention Center', 'start_time' => '2026-11-02 09:00:00', 'end_time' => '2026-11-02 16:00:00', 'capacity' => 60, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Green Cleanup Day', 'description' => 'Community effort to clean our city streets.', 'category_id' => $categoryIds['Community'], 'location' => 'City Square', 'start_time' => '2026-12-05 08:00:00', 'end_time' => '2026-12-05 12:00:00', 'capacity' => 200, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Jazz Night Out', 'description' => 'Relaxing evening with local jazz legends.', 'category_id' => $categoryIds['Music'], 'location' => 'Jazz Lounge', 'start_time' => '2026-12-10 20:00:00', 'end_time' => '2026-12-10 23:00:00', 'capacity' => 50, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Startup Pitching Session', 'description' => 'New entrepreneurs pitching ideas to investors.', 'category_id' => $categoryIds['Education'], 'location' => 'Innovation Hub', 'start_time' => '2026-12-12 09:00:00', 'end_time' => '2026-12-12 12:00:00', 'capacity' => 40, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Street Food Tour', 'description' => 'A culinary adventure through the city streets.', 'category_id' => $categoryIds['Food'], 'location' => 'Old Quarter', 'start_time' => '2026-12-15 17:00:00', 'end_time' => '2026-12-15 20:00:00', 'capacity' => 20, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Yoga in the Park', 'description' => 'Beginner friendly yoga session for everyone.', 'category_id' => $categoryIds['Sports'], 'location' => 'Sunset Garden', 'start_time' => '2026-12-18 07:00:00', 'end_time' => '2026-12-18 08:30:00', 'capacity' => 100, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Photography Masterclass', 'description' => 'Capture the world through a new lens.', 'category_id' => $categoryIds['Art'], 'location' => 'Studio 4B', 'start_time' => '2026-12-20 14:00:00', 'end_time' => '2026-12-20 17:00:00', 'capacity' => 25, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Community Gardening', 'description' => 'Planting seeds for a greener future.', 'category_id' => $categoryIds['Community'], 'location' => 'Local Park', 'start_time' => '2026-12-22 09:00:00', 'end_time' => '2026-12-22 13:00:00', 'capacity' => 50, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'AI Seminar 2026', 'description' => 'Latest trends in Artificial Intelligence.', 'category_id' => $categoryIds['Education'], 'location' => 'University Hall', 'start_time' => '2026-12-25 10:00:00', 'end_time' => '2026-12-25 15:00:00', 'capacity' => 200, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Charity Gala Dinner', 'description' => 'Formal dinner for a great cause.', 'category_id' => $categoryIds['Food'], 'location' => 'Grand Hotel', 'start_time' => '2026-12-28 19:00:00', 'end_time' => '2026-12-28 23:00:00', 'capacity' => 150, 'status' => 'published', 'organizer_id' => $organizer->id],
            ['title' => 'Painting Workshop', 'description' => 'Create your own masterpiece.', 'category_id' => $categoryIds['Art'], 'location' => 'Art Space', 'start_time' => '2026-12-30 15:00:00', 'end_time' => '2026-12-30 18:00:00', 'capacity' => 20, 'status' => 'published', 'organizer_id' => $organizer->id],

            [
                'title' => 'Da Nang DevTalk: Advanced AI & Coding',
                'description' => 'A hands-on workshop on leveraging AI and cloud environments for modern software development.',
                'category_id' => $categoryIds['Education'],
                'location' => 'Software IT Park, Da Nang',
                'start_time' => '2026-05-26 09:00:00',
                'end_time' => '2026-05-27 07:00:00',
                'capacity' => 80,
                'status' => 'published',
                'organizer_id' => $organizer->id
            ],
            [
                'title' => 'My Khe Beach Sunrise Yoga',
                'description' => 'Start your day with mindfulness and community wellness by the ocean. Open to all levels to help balance a busy lifestyle.',
                'category_id' => $categoryIds['Sports'],
                'location' => 'My Khe Beach, Da Nang',
                'start_time' => '2026-05-27 05:30:00',
                'end_time' => '2026-05-27 12:00:00',
                'capacity' => 50,
                'status' => 'published',
                'organizer_id' => $organizer->id
            ],
        ];

        foreach ($eventsData as $index => $eventData) {
            $event = Event::create($eventData);

            // Logic để đăng ký cho sự kiện
            // Nếu là sự kiện đầu tiên, ép buộc đăng ký full capacity (10 người)
            $count = ($index === 0) ? 10 : rand(3, 7);
            $randomAttendees = $attendeesCollection->random($count);

            foreach ($randomAttendees as $attendee) {
                Registration::create([
                    'user_id' => $attendee->id,
                    'event_id' => $event->id,
                    'status' => 'confirmed',
                ]);
            }
            $event->update(['registered_count' => $count]);
        }
    }
}
