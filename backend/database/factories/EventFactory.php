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

        return [
            'organizer_id' => User::factory(),
            'title' => fake()->sentence(6),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->address(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'capacity' => fake()->numberBetween(20, 100),
            'registered_count' => 0,
            'status' => fake()->randomElement(['draft', 'published', 'completed']),
        ];
    }
}
