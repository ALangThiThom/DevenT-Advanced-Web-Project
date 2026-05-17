<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startTime = fake()->dateTimeBetween('+1 days', '+10 days');
        $endTime = (clone $startTime)->modify('+' . fake()->numberBetween(2, 8) . ' hours');

        // build schedule items (1-4 items)
        $schedule = [];
        $parts = fake()->numberBetween(1, 4);
        for ($i = 0; $i < $parts; $i++) {
            $itemTime = (clone $startTime)->modify('+' . ($i * 1) . ' hours');
            $schedule[] = [
                'time' => $itemTime->format('Y-m-d H:i:s'),
                'title' => fake()->sentence(3),
                'description' => fake()->sentence(),
            ];
        }

        return [
            'organizer_id' => User::factory(),
            'title' => fake()->sentence(6),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->address(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'schedule' => $schedule,
            'capacity' => fake()->numberBetween(20, 100),
            'registered_count' => 0,
            'status' => fake()->randomElement(['draft', 'published', 'completed']),
        ];
    }
}
