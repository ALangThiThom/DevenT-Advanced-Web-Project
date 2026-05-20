<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\Category;
use Illuminate\Support\Facades\Schema;

class EventSeeder extends Seeder
{
    public function run()
    {
        // Tắt kiểm tra khóa ngoại để xóa dữ liệu cũ một cách an toàn
        Schema::disableForeignKeyConstraints();
        Event::truncate();
        Schema::enableForeignKeyConstraints();

        // Lấy danh sách ID của các category từ Database đã được tạo bởi CategorySeeder
        $categoryIds = Category::pluck('id', 'name');

        // 1. Đêm nhạc Neon Nights
        Event::create([
            'organizer_id' => 1,
            'title' => 'Đêm nhạc Neon Nights',
            'description' => 'Hành trình âm thanh hình ảnh đắm chìm với các nghệ sĩ điện tử quốc tế.',
            'category_id' => $categoryIds['Music'],
            'location' => 'Sân vận động Skyline',
            'start_time' => '2026-10-24 19:00:00', // Sửa: Đổi 'date_time' thành 'start_time'
            'end_time' => '2026-10-24 22:00:00',   // Thêm: Bổ sung 'end_time' bắt buộc
            'capacity' => 150,
            'status' => 'published', // Sửa: Đổi 'Published' thành viết thường 'published'

        ]);

        // 2. Giải Chạy Marathon Thành Phố
        Event::create([
            'title' => 'Giải Chạy Marathon Thành Phố',
            'description' => 'Thử thách giới hạn bản thân với cung đường chạy ven biển tuyệt đẹp.',
            'category_id' => $categoryIds['Sports'],
            'location' => 'Công viên Trung tâm',
            'start_time' => '2026-10-28 05:30:00',
            'end_time' => '2026-10-28 11:30:00',
            'capacity' => 500,
            'status' => 'published',
            'organizer_id' => 1
        ]);

        // 3. Xưởng làm Pasta Thủ công
        Event::create([
            'title' => 'Xưởng làm Pasta Thủ công',
            'description' => 'Học bí quyết làm pasta truyền thống từ các đầu bếp nổi tiếng địa phương.',
            'category_id' => $categoryIds['Food'],
            'location' => 'Phòng bếp The Kitchen Lab',
            'start_time' => '2026-11-15 18:30:00',
            'end_time' => '2026-11-15 21:30:00',
            'capacity' => 30,
            'status' => 'published',
            'organizer_id' => 1
        ]);

        // 4. Triển lãm Tranh Sơn mài Hiện đại
        Event::create([
            'title' => 'Triển lãm Tranh Sơn mài Hiện đại',
            'description' => 'Không gian nghệ thuật trưng bày các tác phẩm sơn mài đương đại độc đáo.',
            'category_id' => $categoryIds['Art'],
            'location' => 'Bảo tàng Mỹ thuật',
            'start_time' => '2026-11-20 09:00:00',
            'end_time' => '2026-11-20 17:00:00',
            'capacity' => 100,
            'status' => 'published',
            'organizer_id' => 1
        ]);

        // 5. Hội nghị Công nghệ Tương lai
        Event::create([
            'title' => 'Hội nghị Công nghệ Tương lai',
            'description' => 'Khám phá thập kỷ đổi mới tiếp theo cùng các nhà lãnh đạo ngành.',
            'category_id' => $categoryIds['Education'],
            'location' => 'Trung tâm Hội nghị Quốc gia',
            'start_time' => '2026-11-02 09:00:00',
            'end_time' => '2026-11-02 16:00:00',
            'capacity' => 60,
            'status' => 'published',
            'organizer_id' => 1
        ]);

        // 6. Ngày hội Thu gom Rác thải Xanh
        Event::create([
            'title' => 'Ngày hội Thu gom Rác thải Xanh',
            'description' => 'Chung tay bảo vệ môi trường, đổi rác lấy cây xanh và quà tặng ý nghĩa.',
            'category_id' => $categoryIds['Community'],
            'location' => 'Quảng trường Thành phố',
            'start_time' => '2026-12-05 08:00:00',
            'end_time' => '2026-12-05 12:00:00',
            'capacity' => 200,
            'status' => 'published',
            'organizer_id' => 1
        ]);
    }
}
