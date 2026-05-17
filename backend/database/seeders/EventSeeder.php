<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Illuminate\Support\Facades\Schema; 

class EventSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Event::truncate();
        Schema::enableForeignKeyConstraints();
        Event::create([
            'name' => 'Đêm nhạc Neon Nights',
            'description' => 'Hành trình âm thanh hình ảnh đắm chìm với các nghệ sĩ điện tử quốc tế.',
            'category' => 'Âm nhạc',
            'location' => 'Sân vận động Skyline',
            'date_time' => '2026-10-24 19:00:00',
            'capacity' => 150,
            'status' => 'Published',
            'organizer_id' => 1
        ]);

        Event::create([
            'name' => 'Giải Chạy Marathon Thành Phố',
            'description' => 'Thử thách giới hạn bản thân với cung đường chạy ven biển tuyệt đẹp.',
            'category' => 'Thể thao',
            'location' => 'Công viên Trung tâm',
            'date_time' => '2026-10-28 05:30:00',
            'capacity' => 500,
            'status' => 'Published',
            'organizer_id' => 1
        ]);

        Event::create([
            'name' => 'Xưởng làm Pasta Thủ công',
            'description' => 'Học bí quyết làm pasta truyền thống từ các đầu bếp nổi tiếng địa phương.',
            'category' => 'Ẩm thực',
            'location' => 'Phòng bếp The Kitchen Lab',
            'date_time' => '2026-11-15 18:30:00',
            'capacity' => 30,
            'status' => 'Published',
            'organizer_id' => 1
        ]);

        Event::create([
            'name' => 'Triển lãm Tranh Sơn mài Hiện đại',
            'description' => 'Không gian nghệ thuật trưng bày các tác phẩm sơn mài đương đại độc đáo.',
            'category' => 'Nghệ thuật',
            'location' => 'Bảo tàng Mỹ thuật',
            'date_time' => '2026-11-20 09:00:00',
            'capacity' => 100,
            'status' => 'Published',
            'organizer_id' => 1
        ]);

        Event::create([
            'name' => 'Hội nghị Công nghệ Tương lai',
            'description' => 'Khám phá thập kỷ đổi mới tiếp theo cùng các nhà lãnh đạo ngành.',
            'category' => 'Giáo dục',
            'location' => 'Trung tâm Hội nghị Quốc gia',
            'date_time' => '2026-11-02 09:00:00',
            'capacity' => 60,
            'status' => 'Published',
            'organizer_id' => 1
        ]);

        Event::create([
            'name' => 'Ngày hội Thu gom Rác thải Xanh',
            'description' => 'Chung tay bảo vệ môi trường, đổi rác lấy cây xanh và quà tặng ý nghĩa.',
            'category' => 'Cộng đồng',
            'location' => 'Quảng trường Thành phố',
            'date_time' => '2026-12-05 08:00:00',
            'capacity' => 200,
            'status' => 'Published',
            'organizer_id' => 1
        ]);
    }
}