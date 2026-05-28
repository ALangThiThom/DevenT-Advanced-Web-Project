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

    // BỔ SUNG: Khai báo thêm confirmed_count và registration_percentage vào JSON response
    protected $appends = [
        'remaining_spots',
        'confirmed_count',
        'registration_percentage'
    ];

    /**
     * Logic tính số chỗ trống (từ task trước)
     */
    public function getRemainingSpotsAttribute()
    {
        return max(0, $this->capacity - $this->registered_count);
    }

    /**
     * BỔ SUNG 1: Trả về số lượng đã đăng ký (Đóng vai trò là confirmed_count)
     */
    public function getConfirmedCountAttribute()
    {
        return $this->registered_count ?? 0;
    }

    /**
     * BỔ SUNG 2: Tính tỷ lệ lấp đầy (Phần trăm đăng ký)
     * Kèm theo cơ chế chặn lỗi Division by Zero
     */
    public function getRegistrationPercentageAttribute()
    {
        // Nếu sức chứa bằng 0 hoặc chưa nhập, mặc định trả về 0%
        if (empty($this->capacity) || $this->capacity <= 0) {
            return 0;
        }

        $percentage = ($this->registered_count / $this->capacity) * 100;

        // Làm tròn số và đảm bảo thanh phần trăm không bao giờ vượt quá 100%
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
