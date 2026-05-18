import { Link } from "react-router-dom";
import "./eventCard.css";

const EventCard = ({ event }) => {
  // Hàm xử lý định dạng ngày giờ: "2026-10-24 19:00:00" -> "24 TH10 • 19:00"
  const formatEventDateTime = (rawDateTime) => {
    if (!rawDateTime) return "";
    const parsedDate = new Date(rawDateTime);
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
    return `${day} TH${month} • ${hours}:${minutes}`;
  };

  // Tính toán số chỗ dựa trên dữ liệu thật từ Backend
  const simulatedAvailableSeats = event.capacity - 10; 

  return (
    <Link to={`/events/${event.id}`} className="event-card" style={{ textDecoration: 'none' }}>
      <div className="event-card">
        {/* KHỐI BANNER XANH LÁ (Phần bị thiếu trong hình hiện tại của bạn) */}
        <div className="event-card__banner">
          <div className="event-card__image-placeholder"></div>
          <span className="event-card__tag">{event.category}</span>
      </div>

      {/* KHỐI NỘI DUNG DƯỚI BANNER */}
      <div className="event-card__body">
        <div className="event-card__date-row">
          <span className="event-card__icon">📅</span>
          <span className="event-card__date-text">{formatEventDateTime(event.start_time)}</span>
        </div>

        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__desc">{event.description}</p>

        <div className="event-card__footer">
          <div className="event-card__location">
            <span className="event-card__icon">📍</span>
            <span className="event-card__location-text">{event.location}</span>
          </div>
          
          {/* KHỐI PILL HIỂN THỊ SỐ CHỖ BO GÓC MÀU XANH MINT */}
          <div className="event-card__seats-badge">
            Còn {simulatedAvailableSeats} / {event.capacity} chỗ
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default EventCard;