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

    //Khai báo mảng appends để tự động đính kèm trường ảo
    protected $appends = [
        'remaining_spots'
    ];

    /**
     *
     * Sử dụng hàm max() để đảm bảo số chỗ trống (remaining_spots) không bao giờ bị âm
     */
    public function getRemainingSpotsAttribute()
    {
        return max(0, $this->capacity - $this->registered_count);
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
