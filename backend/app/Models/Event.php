<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'organizer_id',
        'name',
        'description',
        'category',
        'location',
        'date_time',
        'capacity',
        'status',
    ];

    protected $casts = [
        'date_time' => 'datetime',
    ];
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
}