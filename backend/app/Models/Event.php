<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'title',
        'category_id',
        'description',
        'location',
        'schedule',
        'start_time',
        'end_time',
        'capacity',
        'registered_count',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'schedule' => 'array',
    ];

    protected $appends = [
        'remaining_spots',
        'confirmed_count',
        'registration_percentage'
    ];


    public function getRemainingSpotsAttribute()
    {
        return max(0, $this->capacity - $this->registered_count);
    }


    public function getConfirmedCountAttribute()
    {
        return $this->registered_count ?? 0;
    }

    public function getRegistrationPercentageAttribute()
    {

        if (empty($this->capacity) || $this->capacity <= 0) {
            return 0;
        }

        $percentage = ($this->registered_count / $this->capacity) * 100;


        return min(100, (int) round($percentage));
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
