import React from 'react';
import './styles/EventDetail.css'; // Import file CSS riêng biệt vừa tách

// Mock Data phục vụ render giao diện
const event = {
  category: 'ÂM NHẠC',
  title: 'Đêm nhạc Neon Nights',
  description: 'Hòa mình vào không gian âm nhạc lắng đọng của mùa thu Hà Nội cùng "Đêm nhạc Neon Nights". Sự kiện quy tụ những nghệ sĩ indie triển vọng nhất, mang đến những bản tình ca da diết và những giai điệu mới lạ, hứa hẹn một hành trình cảm xúc không thể quên trong lòng Nhà hát Lớn.',
  date: '28 Tháng 10, 2024',
  time: '18:00 - 22:00',
  locationName: 'Nhà hát Lớn',
  address: 'Số 1 Tràng Tiền, Hoàn Kiếm, Hà Nội',
  seatsAvailable: 20,
  seatsTotal: 30,
};

export default function EventDetail() {
  return (
    <div className="w-100 bg-light min-vh-100 pb-5 event-detail-wrapper">
      
      {/* 1. Vùng Xanh Lá (Thumbnail Banner) */}
      <div className="w-100 event-banner"></div>

      {/* 2. Vùng Nội Dung Sự Kiện */}
      <div className="container px-4 px-md-0 event-content-container">
        <div className="row g-4 justify-content-center">
          
          {/* CỘT TRÁI: Chi tiết nội dung sự kiện */}
          <div className="col-lg-7 col-xl-8">
            
            {/* Khối thông tin chính (Danh mục, Tiêu đề, Giới thiệu) */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white text-start">
              
              {/* Category (Danh mục) */}
              <div className="mb-3">
                <span className="badge fw-semibold rounded-pill px-3 py-2 event-badge-category">
                  {event.category}
                </span>
              </div>

              {/* Tiêu đề sự kiện */}
              <h1 className="fw-bold mb-4 event-title">
                {event.title}
              </h1>

              <hr className="my-4 opacity-25 event-divider" />

              {/* Giới thiệu sự kiện */}
              <h3 className="fw-bold mb-3 event-section-heading">
                Giới thiệu sự kiện
              </h3>
              <p className="text-secondary lh-lg mb-0 event-description-text">
                {event.description}
              </p>
            </div>

            {/* Khối lịch trình sự kiện (Timeline) */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white text-start">
              <h3 className="fw-bold mb-4 event-section-heading">
                Lịch trình sự kiện
              </h3>
              
              <div className="position-relative ps-4 border-start border-2 timeline-container">
                {/* Item 1 */}
                <div className="mb-4 position-relative">
                  <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                  <span className="fw-bold d-block small mb-1 timeline-time">18:00</span>
                  <h5 className="fw-bold mb-1 timeline-title">Đón khách & Check-in</h5>
                  <p className="text-muted small mb-0">Khách mời nhận bộ kit quà tặng mùa thu và ổn định chỗ ngồi tại sảnh chính.</p>
                </div>

                {/* Item 2 */}
                <div className="mb-4 position-relative">
                  <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                  <span className="fw-bold d-block small mb-1 timeline-time">19:00</span>
                  <h5 className="fw-bold mb-1 timeline-title">Khai mạc & Phần 1</h5>
                  <p className="text-muted small mb-0">Màn trình diễn acoustic mở đầu với sự góp mặt của các ban nhạc trẻ.</p>
                </div>

                {/* Item 3 */}
                <div className="position-relative">
                  <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                  <span className="fw-bold d-block small mb-1 timeline-time">21:00</span>
                  <h5 className="fw-bold mb-1 timeline-title">Kết thúc & Giao lưu</h5>
                  <p className="text-muted small mb-0">Chụp ảnh kỷ niệm cùng nghệ sĩ và bế mạc sự kiện.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: Box thông tin thời gian, địa điểm, đăng ký nhanh */}
          <div className="col-lg-5 col-xl-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-4 bg-white sticky-lg-top text-start sticky-widget">
              
              {/* Ngày tổ chức */}
              <div className="d-flex align-items-center mb-4">
                <span className="fs-4 me-3 p-2 rounded-3 d-flex align-items-center justify-content-center widget-icon-box">📅</span>
                <div>
                  <small className="text-muted d-block text-uppercase fw-bold widget-label">Ngày tổ chức</small>
                  <span className="fw-bold text-dark widget-value-main">{event.date}</span>
                </div>
              </div>

              {/* Giờ diễn ra */}
              <div className="d-flex align-items-center mb-4">
                <span className="fs-4 me-3 p-2 rounded-3 d-flex align-items-center justify-content-center widget-icon-box">🕒</span>
                <div>
                  <small className="text-muted d-block text-uppercase fw-bold widget-label">Giờ diễn ra</small>
                  <span className="fw-bold text-dark widget-value-main">{event.time}</span>
                </div>
              </div>

              {/* Địa điểm */}
              <div className="d-flex align-items-start mb-4">
                <span className="fs-4 me-3 p-2 rounded-3 d-flex align-items-center justify-content-center mt-1 widget-icon-box">📍</span>
                <div>
                  <small className="text-muted d-block text-uppercase fw-bold widget-label">Địa điểm</small>
                  <span className="fw-bold text-dark d-block widget-value-main">{event.locationName}</span>
                  <small className="text-muted d-block mt-1 widget-value-sub">{event.address}</small>
                </div>
              </div>

              <hr className="my-4 opacity-25" />

              {/* Trạng thái số lượng chỗ */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-medium">Trạng thái chỗ</span>
                  <span className="badge fw-bold px-2 py-1 seats-badge">
                    Còn {event.seatsAvailable} / {event.seatsTotal} chỗ
                  </span>
                </div>
                <div className="progress" style={{ height: '6px', backgroundColor: '#e5e7eb' }}>
                  <div 
                    className="progress-bar rounded-pill progress-bar-fill" 
                    role="progressbar" 
                    style={{ width: `${(event.seatsAvailable / event.seatsTotal) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Nút đăng ký */}
              <button className="btn w-100 py-3 fw-bold border-0 shadow-sm rounded-3 text-white btn-register-submit">
                Đăng ký tham gia
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}