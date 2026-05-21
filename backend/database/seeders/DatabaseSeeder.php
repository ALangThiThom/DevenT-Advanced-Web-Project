<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Category;
use App\Models\Registration;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Bypass authentiaction (for no login feature)
        $organizer = User::updateOrCreate(
            ['email' => 'organizer@dev.com'],
            [
                'name' => 'Developer Organizer',
                'password' => Hash::make('password123'),
                'role' => 'organizer',
            ]
        );

        $organizer->tokens()->delete();
        $token = $organizer->createToken('dev-bypass-token')->plainTextToken;

        $this->command->info($token);




        $attendees = User::factory(10)->create(['role' => 'attendee']);

        $events = Event::factory(5)->create(['organizer_id' => $organizer->id]);

        foreach ($events as $event) {
            $randomAttendees = $attendees->random(rand(3, 7));
            $registeredCount = 0;

            foreach ($randomAttendees as $attendee) {
                Registration::create([
                    'user_id' => $attendee->id,
                    'event_id' => $event->id,
                    'status' => 'confirmed',
                ]);
                $registeredCount++;

                if ($event->status === 'completed') {
                    Review::factory()->create([
                        'user_id' => $attendee->id,
                        'event_id' => $event->id,
                    ]);
                }
            }

            $event->update(['registered_count' => $registeredCount]);
        }
    }
}
