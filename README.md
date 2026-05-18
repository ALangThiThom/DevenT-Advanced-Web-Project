# DevenT - Nền tảng Quản lý Sự kiện Cộng đồng (Community Event Management Platform)

DevenT là một nền tảng Web full-stack hiện đại được thiết kế nhằm tối ưu hóa quy trình tổ chức, phân loại, đăng ký tham gia và phản hồi các sự kiện cộng đồng. Hệ thống được xây dựng dựa trên kiến trúc phân tách rõ ràng giữa Client (React) và Server (Laravel RESTful API), hướng tới việc xử lý các luồng nghiệp vụ phức tạp về phân quyền, hàng chờ tự động và quản lý trạng thái dữ liệu theo thời gian thực.

---

## 🛠️ Công Nghệ Triển Khai (Tech Stack)

### 1. Giao diện (Frontend)
* **Thư viện cốt lõi:** ReactJS (Khởi tạo bằng Vite mang lại tốc độ phản hồi cực nhanh).
* **Quản lý trạng thái (State Management):** Zustand kết hợp với Middleware `persist` giúp tự động đồng bộ hóa trạng thái phiên làm việc của người dùng vào `localStorage`.
* **Giao tiếp API:** Axios tích hợp hệ thống Interceptors giúp tự động đính kèm Token xác thực (`Authorization: Bearer <token>`) vào Header của mọi Request và xử lý tập trung mã lỗi 401 Unauthorized khi phiên làm việc hết hạn.
* **Định tuyến & Bảo vệ tuyến đường:** React Router Dom kết hợp Component cấu trúc `<PrivateRoute>` giúp chặn và phân luồng truy cập nghiêm ngặt dựa trên vai trò (Role).

### 2. Máy chủ & Cơ sở dữ liệu (Backend)
* **Framework nền tảng:** Laravel 11 tối ưu hóa hiệu năng xử lý RESTful API.
* **Cơ chế xác thực bảo mật:** Laravel Sanctum quản lý phiên làm việc thông qua Token dạng chuỗi được mã hóa lưu trữ động tại bảng hệ thống `personal_access_tokens`.
* **Hệ quản trị cơ sở dữ liệu:** MySQL quản lý dữ liệu quan hệ, thiết lập ràng buộc khóa ngoại (Foreign Keys) nghiêm ngặt để đảm bảo tính toàn vẹn dữ liệu.

---

## 📌 Các Quy Tắc Nghiệp Vụ Cốt Lõi (Business Rules & Scope Constraints)

Để đảm bảo hệ thống vận hành đúng đặc tả kỹ thuật và tài liệu phân tích yêu cầu, đội ngũ phát triển cần tuân thủ nghiêm ngặt 3 quy tắc nền tảng sau:

### 1. Tuyệt đối không có tính năng Xóa sự kiện (No Event Deletion)
* Hệ thống không cung cấp bất kỳ nút xóa hoặc API hủy bản ghi sự kiện nào khỏi cơ sở dữ liệu nhằm bảo toàn tính toàn vẹn và lịch sử lưu vết dữ liệu (Data Integrity).
* Sự kiện chỉ có thể chỉnh sửa khi ở trạng thái Nháp (`Draft`) hoặc chuyển sang trạng thái Hủy bỏ (`Cancelled`) chủ động từ Ban tổ chức (Organizer).

### 2. Ràng buộc nghiêm ngặt về Đánh giá và Phản hồi (Finished Status Constraint)
* Người tham dự (Attendee) chỉ được phép gửi biểu mẫu chấm điểm sao và để lại bình luận đối với các sự kiện mà họ đã đăng ký thành công (Trạng thái `Confirmed`) và sự kiện đó đã kết thúc hoàn toàn.
* **Quy tắc hiển thị:** Toàn bộ khối dữ liệu đánh giá công khai, lượt bình luận (Review Feed) và điểm số xếp hạng trung bình (`AVG()`) trên giao diện chi tiết sự kiện sẽ bị ẩn hoàn toàn nếu trạng thái thực tế của sự kiện chưa chuyển sang Đã kết thúc (`Finished`).

### 3. Hàng chờ tự động theo cơ chế FIFO (First-In, First-Out Waitlist)
* Khi một sự kiện đạt giới hạn sức chứa tối đa (`capacity`), nút đăng ký sẽ tự động chuyển sang trạng thái "Join Waitlist". Người dùng đăng ký tại thời điểm này sẽ được lưu ở trạng thái `Waiting`.
* Ngay khi có một người tham dự chính thức chọn Hủy tham gia (Cancelled Registration), hệ thống phía Backend sẽ tự động kích hoạt Trigger tìm kiếm người dùng ở trạng thái `Waiting` có thời gian tạo sớm nhất để đôn lên trạng thái `Confirmed`. Hệ thống chỉ cập nhật trực tiếp vào cơ sở dữ liệu, không tích hợp cơ chế thông báo đẩy (In-app/Email/SMS notification là Out of Scope).

---

## 📂 Cấu Trúc Thư Mục Dự Án (Project Directory Structure)

Dự án được phân tách thành hai thư mục độc lập chạy song song:

```plaintext
devent-advanced-web-project/
├── backend/                             # MÃ NGUỒN SERVER (LARAVEL 11)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php   # Xử lý Đăng ký, Đăng nhập, Đăng xuất hệ thống
│   │   │   │   └── EventController.php  # Xử lý CRUD (Thêm/Sửa/Hủy) và quản lý trạng thái sự kiện
│   │   │   └── Middleware/
│   │   │       └── CheckRole.php        # Middleware phân quyền cổng vào bảo vệ tuyến đường API
│   │   └── Models/
│   │       ├── User.php                 # Model Người dùng (Attendee/Organizer) Chứa HasApiTokens
│   │       ├── Event.php                # Model Sự kiện (Quản lý trạng thái Draft/Published/Cancelled/Finished)
│   │       ├── Registration.php         # Model Đăng ký tham gia (Confirmed/Waiting)
│   │       └── Review.php               # Model Lưu vết đánh giá chất lượng sự kiện
│   ├── database/
│   │   ├── migrations/                  # Các file khởi tạo cấu trúc bảng MySQL có ràng buộc khóa ngoại
│   │   └── seeders/                     # File sinh dữ liệu mẫu hệ thống phục vụ giai đoạn thử nghiệm
│   └── routes/
│       └── api.php                      # Định nghĩa hệ thống API Routes công khai và bảo mật (auth:sanctum)
│
└── frontend/                            # MÃ NGUỒN CLIENT (REACTJS / VITE)
    ├── src/
    │   ├── components/
    │   │   ├── common/                  # Các Component tái sử dụng (EventCard, CategoryCard, Search)
    │   │   ├── layout/                  # Khung giao diện cố định (NavBar, Footer)
    │   │   └── PrivateRoute.jsx         # Linh hồn bảo vệ component, chặn đăng nhập chéo Role
    │   ├── hooks/
    │   │   ├── useLogin.js              # Custom hook quản lý logic đăng nhập, validation phía client
    │   │   └── useRegister.js           # Custom hook quản lý biểu mẫu đăng ký tài khoản
    │   ├── pages/
    │   │   ├── Attendee/                # Giao diện dành riêng cho Người tham dự (Dashboard, Login, Register)
    │   │   ├── Organizer/               # Giao diện dành riêng cho Ban tổ chức (Dashboard, Login, Register)
    │   │   └── Home/                    # Trang chủ khám phá sự kiện công khai
    │   ├── services/
    │   │   └── authService.js           # Quản lý cấu hình endpoint và phương thức call API Auth (POST /login, POST /logout)
    │   ├── store/
    │   │   └── authStore.js             # Zustand Store lưu trữ phiên token và thông tin user cục bộ
    │   ├── utils/
    │   │   └── api.js                   # Cấu hình thực thể Axios instance và cài đặt Axios Interceptors
    │   ├── App.jsx                      # Quản lý phân tuyến cây định hướng React Router Dom
    │   └── main.jsx                     # Điểm khởi chạy ứng dụng Frontend
🚀 Hướng Dẫn Cài Đặt & Khởi Chạy (Installation & Setup)
1. Thiết lập Cơ sở dữ liệu (Database Setup)
Mở hệ quản trị cơ sở dữ liệu MySQL của bạn (XAMPP, phpMyAdmin, hoặc MySQL Workbench).

Khởi tạo một cơ sở dữ liệu trống có tên: devent_db.

2. Cấu hình và Khởi chạy Máy chủ Backend (Laravel)
Di chuyển terminal vào thư mục backend/ và thực hiện tuần tự các lệnh sau:

Bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt toàn bộ các thư viện phụ thuộc phía máy chủ
composer install

# 3. Tạo tệp cấu hình môi trường từ file mẫu
cp .env.example .env

# 4. Sinh mã khóa ứng dụng bảo mật
php artisan key:generate
Mở tệp .env vừa tạo tại thư mục backend/, tìm đến các dòng cấu hình kết nối DB_ và chỉnh sửa thông tin khớp với máy tính cá nhân của bạn:

Đoạn mã
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=devent_db
DB_USERNAME=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
Tiến hành chạy Migration để tạo cấu trúc bảng và nạp dữ liệu mẫu vào database:

Bash
# Chạy hệ thống tạo bảng và nạp dữ liệu từ Seeders
php artisan migrate --seed

# Khởi chạy server Backend cục bộ
php artisan serve
Server mặc định sẽ chạy tại mốc địa chỉ: http://127.0.0.1:8000

3. Cấu hình và Khởi chạy Giao diện Frontend (React)
Mở một cửa sổ Terminal mới, di chuyển vào thư mục frontend/ và thực hiện các lệnh sau:

Bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các gói thư viện Node.js (React Router, Zustand, Axios, v.v.)
npm install

# 3. Tạo file cấu hình môi trường từ file mẫu
cp .env.example .env
Đảm bảo tệp .env của frontend chứa biến đường dẫn chính xác tới cổng chạy của Laravel:

Đoạn mã
VITE_API_BASE_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
Khởi chạy ứng dụng:

Bash
# 4. Khởi chạy môi trường phát triển local của Vite
npm run dev
Ứng dụng client mặc định sẽ sẵn sàng tại mốc địa chỉ: http://localhost:5173

🔄 Quy Trình Phát Triển & Commit Chuẩn Hóa (Git Workflow)
Dự án áp dụng quy chuẩn Conventional Commits để quản lý lịch sử mã nguồn chặt chẽ. Mọi thành viên bắt buộc phải tạo nhánh tính năng từ develop và thực hiện commit theo đúng cấu trúc tiền tố:

feat: Khi phát triển một tính năng mới (Ví dụ: feat: phát triển màn hình chỉnh sửa sự kiện).

fix: Khi thực hiện sửa đổi một lỗi kỹ thuật hoặc logic code.

chore: Khi cập nhật cấu trúc thư mục, cấu hình hệ thống, hoặc cài đặt thư viện mới.
