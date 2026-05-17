// Ví dụ file: src/pages/Attendee/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Navbar from "../../components/layout/Navbar";

export default function AttendeeDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Logic gọi API lấy danh sách sự kiện (bạn có thể đưa hàm này vào eventService)
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data.data);
      } catch (error) {
        console.error("Lỗi lấy sự kiện", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {/* 1. Gọi Navbar ở đây để có thanh điều hướng chứa tên user */}
      <Navbar />

      {/* 2. Hiển thị danh sách sự kiện thay vì in tên */}
      <div className="container mt-4">
        <h2>Sự kiện nổi bật</h2>
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4" key={event.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
