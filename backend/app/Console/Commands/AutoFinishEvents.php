<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Event;
use Carbon\Carbon;

class AutoFinishEvents extends Command
{
    /**
     * Tên lệnh (signature) dùng để gọi trong terminal.
     * Ví dụ: php artisan events:auto-finish
     *
     * @var string
     */
    protected $signature = 'events:auto-finish';

    /**
     * Mô tả chức năng của lệnh này.
     *
     * @var string
     */
    protected $description = 'Tự động cập nhật trạng thái sự kiện thành finished khi thời gian kết thúc đã qua so với thời gian thực tế.';

    /**
     * Hàm thực thi chính của lệnh (chứa logic cốt lõi).
     */
    public function handle()
    {
        // 1. Lấy thời gian hiện tại của máy chủ (server)
        $currentTime = Carbon::now();

        // 2. Truy vấn các sự kiện đang ở trạng thái 'published' (đã công khai)
        // nhưng có thời gian kết thúc (end_time) nhỏ hơn (<) thời gian hiện tại
        $expiredEventsQuery = Event::where('status', 'published')
            ->where('end_time', '<', $currentTime);

        // 3. Đếm xem có bao nhiêu sự kiện thỏa mãn điều kiện truy vấn ở trên
        $eventsCount = $expiredEventsQuery->count();

        // 4. Nếu có ít nhất 1 sự kiện quá hạn, thực hiện cập nhật
        if ($eventsCount > 0) {
            // Cập nhật tất cả các sự kiện đó sang trạng thái 'finished'
            $expiredEventsQuery->update(['status' => 'ended']);

            // In ra thông báo thành công trên màn hình Terminal
            $this->info("Đã cập nhật thành công {$eventsCount} sự kiện sang trạng thái 'finished'.");
        } else {
            // In ra thông báo khi không tìm thấy sự kiện nào cần cập nhật
            $this->info('Không có sự kiện nào cần cập nhật trạng thái vào lúc này.');
        }
    }
}
