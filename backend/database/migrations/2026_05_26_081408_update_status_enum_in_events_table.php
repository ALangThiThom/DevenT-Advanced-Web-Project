<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Thêm 'ended' vào danh sách ENUM (giữ nguyên 'completed' tạm thời để tránh lỗi rớt dữ liệu)
        DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('draft', 'published', 'cancelled', 'completed', 'ended') DEFAULT 'draft'");

        // 2. Chuyển đổi dữ liệu cũ: Cập nhật các sự kiện đang có status 'completed' thành 'ended'
        DB::table('events')->where('status', 'completed')->update(['status' => 'ended']);

        // 3. Xóa hoàn toàn chữ 'completed' ra khỏi cấu trúc ENUM
        DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('draft', 'published', 'cancelled', 'ended') DEFAULT 'draft'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Làm ngược lại các bước trên nếu bạn chạy lệnh rollback
        DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('draft', 'published', 'cancelled', 'completed', 'ended') DEFAULT 'draft'");

        DB::table('events')->where('status', 'ended')->update(['status' => 'completed']);

        DB::statement("ALTER TABLE events MODIFY COLUMN status ENUM('draft', 'published', 'cancelled', 'completed') DEFAULT 'draft'");
    }
};
