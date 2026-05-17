import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicEventById } from "../../services/eventService";
import "./styles/EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError("Event ID không được cung cấp.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPublicEventById(id);
        setEvent(data);
      } catch (fetchError) {
        setError(
          fetchError?.response?.data?.message ||
            "Không thể tải chi tiết sự kiện.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const formatTimeRange = (start, end) => {
    if (!start || !end) return "-";
    const startTime = new Date(start).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(end).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startTime} - ${endTime}`;
  };

  const renderBanner = () => {
    if (!event) return null;
    if (event.thumbnail_url) {
      return (
        <div
          className="w-100 event-banner"
          style={{
            backgroundImage: `url(${event.thumbnail_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      );
    }

    return <div className="w-100 event-banner"></div>;
  };

  if (loading) {
    return (
      <div className="w-100 bg-light min-vh-100 pb-5 event-detail-wrapper">
        <div className="container py-5 text-center">
          Đang tải thông tin sự kiện...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-100 bg-light min-vh-100 pb-5 event-detail-wrapper">
        <div className="container py-5 text-center text-danger">{error}</div>
      </div>
    );
  }

  const seatsTotal = event.capacity || 0;
  const seatsAvailable = seatsTotal - (event.registrations_count || 0);
  const eventCategory = event.category || "Sự kiện";
  const eventLocation = event.location || "Địa điểm chưa xác định";
  const eventAddress =
    event.address || event.location || "Không có địa chỉ chi tiết";
  const eventDate = formatDate(event.start_time);
  const eventTime = formatTimeRange(event.start_time, event.end_time);

  return (
    <div className="w-100 bg-light min-vh-100 pb-5 event-detail-wrapper">
      {renderBanner()}

      <div className="container px-4 px-md-0 event-content-container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-7 col-xl-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white text-start">
              <div className="mb-3">
                <span className="badge fw-semibold rounded-pill px-3 py-2 event-badge-category">
                  {eventCategory}
                </span>
              </div>

              <h1 className="fw-bold mb-4 event-title">{event.title}</h1>

              <hr className="my-4 opacity-25 event-divider" />

              <h3 className="fw-bold mb-3 event-section-heading">
                Giới thiệu sự kiện
              </h3>
              <p className="text-secondary lh-lg mb-0 event-description-text">
                {event.description || "Mô tả sự kiện chưa được cập nhật."}
              </p>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white text-start">
              <h3 className="fw-bold mb-4 event-section-heading">
                Lịch trình sự kiện
              </h3>
              <div className="position-relative ps-4 border-start border-2 timeline-container">
                {Array.isArray(event.schedule) && event.schedule.length > 0 ? (
                  event.schedule.map((item, idx) => (
                    <div className="mb-4 position-relative" key={idx}>
                      <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                      <span className="fw-bold d-block small mb-1 timeline-time">
                        {new Date(item.time).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <h5 className="fw-bold mb-1 timeline-title">
                        {item.title}
                      </h5>
                      <p className="text-muted small mb-0">
                        {item.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="mb-4 position-relative">
                      <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                      <span className="fw-bold d-block small mb-1 timeline-time">
                        {eventTime.split(" - ")[0]}
                      </span>
                      <h5 className="fw-bold mb-1 timeline-title">Bắt đầu</h5>
                      <p className="text-muted small mb-0">
                        Sự kiện bắt đầu vào lúc {eventTime.split(" - ")[0]}.
                      </p>
                    </div>

                    <div className="mb-4 position-relative">
                      <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                      <span className="fw-bold d-block small mb-1 timeline-time">
                        {eventTime.split(" - ")[1]}
                      </span>
                      <h5 className="fw-bold mb-1 timeline-title">Kết thúc</h5>
                      <p className="text-muted small mb-0">
                        Dự kiến kết thúc lúc {eventTime.split(" - ")[1]}.
                      </p>
                    </div>
                  </>
                )}
                
                {/* Trạng thái sự kiện */}

                {/* <div className="position-relative">
                  <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                  <span className="fw-bold d-block small mb-1 timeline-time">
                    {event.status ? event.status.toUpperCase() : "N/A"}
                  </span>
                  <h5 className="fw-bold mb-1 timeline-title">Trạng thái</h5>
                  <p className="text-muted small mb-0">
                    Sự kiện hiện đang ở trạng thái{" "}
                    {event.status || "chưa xác định"}.
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-xl-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-4 bg-white sticky-lg-top text-start sticky-widget">
              <div className="d-flex align-items-center mb-4">
                <span className="fs-4 me-3 p-2 rounded-3 d-flex align-items-center justify-content-center widget-icon-box">
                  📅
                </span>
                <div>
                  <small className="text-muted d-block text-uppercase fw-bold widget-label">
                    Ngày tổ chức
                  </small>
                  <span className="fw-bold text-dark widget-value-main">
                    {eventDate}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <span className="fs-4 me-3 p-2 rounded-3 d-flex align-items-center justify-content-center widget-icon-box">
                  🕒
                </span>
                <div>
                  <small className="text-muted d-block text-uppercase fw-bold widget-label">
                    Giờ diễn ra
                  </small>
                  <span className="fw-bold text-dark widget-value-main">
                    {eventTime}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <span className="fs-4 me-3 p-2 rounded-3 d-flex align-items-center justify-content-center mt-1 widget-icon-box">
                  📍
                </span>
                <div>
                  <small className="text-muted d-block text-uppercase fw-bold widget-label">
                    Địa điểm
                  </small>
                  <span className="fw-bold text-dark d-block widget-value-main">
                    {eventLocation}
                  </span>
                  <small className="text-muted d-block mt-1 widget-value-sub">
                    {eventAddress}
                  </small>
                </div>
              </div>

              <hr className="my-4 opacity-25" />

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-secondary small fw-medium">
                    Trạng thái chỗ
                  </span>
                  <span className="badge fw-bold px-2 py-1 seats-badge">
                    Còn {seatsAvailable >= 0 ? seatsAvailable : 0} /{" "}
                    {seatsTotal} chỗ
                  </span>
                </div>
                {/* <div
                  className="progress"
                  style={{ height: "6px", backgroundColor: "#e5e7eb" }}
                >
                  <div
                    className="progress-bar rounded-pill progress-bar-fill"
                    role="progressbar"
                    style={{
                      width: `${seatsTotal ? (Math.max(seatsAvailable, 0) / seatsTotal) * 100 : 0}%`,
                    }}
                  ></div>
                </div> */}
              </div>

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
