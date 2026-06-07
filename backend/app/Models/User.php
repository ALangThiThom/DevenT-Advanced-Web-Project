<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * The User model representing both Organizers and Attendees in the system.
 * Handles authentication and acts as the central entity for most relationships.
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     * Ensures sensitive data like passwords and tokens are never accidentally exposed in API responses.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast to native types.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the events created/organized by this user.
     * Business Context: Primarily applicable for users with the 'organizer' role.
     */
    public function organizedEvents()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    /**
     * Get the event registrations for this user.
     * Represents the events this user is attending or waitlisted for.
     */
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Get the reviews and ratings submitted by this user.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
