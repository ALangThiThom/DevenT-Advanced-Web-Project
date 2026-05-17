<?php

namespace Database\Factories;

use App\Models\Registration;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'event_id' => Event::factory(),
            'status' => fake()->randomElement(['confirmed', 'waitlisted', 'cancelled']),
            'queue_position' => null,
        ];
    }
}
