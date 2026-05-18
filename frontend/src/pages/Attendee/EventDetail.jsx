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
        setError("Event ID is not provided.");
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
            "Unable to load event details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const formatTimeRange = (start, end) => {
    if (!start || !end) return "-";
    const startTime = new Date(start).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(end).toLocaleTimeString("en-US", {
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
          Loading event information...
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
  const eventCategory = event.category || "Event";
  const eventLocation = event.location || "Unknown location";
  const eventAddress =
    event.address || event.location || "No detailed address";
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
                About this event
              </h3>
              <p className="text-secondary lh-lg mb-0 event-description-text">
                {event.description || "Event description has not been updated."}
              </p>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white text-start">
              <h3 className="fw-bold mb-4 event-section-heading">
                Event schedule
              </h3>
              <div className="position-relative ps-4 border-start border-2 timeline-container">
                {Array.isArray(event.schedule) && event.schedule.length > 0 ? (
                  event.schedule.map((item, idx) => (
                    <div className="mb-4 position-relative" key={idx}>
                      <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                      <span className="fw-bold d-block small mb-1 timeline-time">
                        {new Date(item.time).toLocaleTimeString("en-US", {
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
                      <h5 className="fw-bold mb-1 timeline-title">Start</h5>
                      <p className="text-muted small mb-0">
                        Event starts at {eventTime.split(" - ")[0]}.
                      </p>
                    </div>

                    <div className="mb-4 position-relative">
                      <div className="position-absolute start-0 translate-middle rounded-circle timeline-dot"></div>
                      <span className="fw-bold d-block small mb-1 timeline-time">
                        {eventTime.split(" - ")[1]}
                      </span>
                      <h5 className="fw-bold mb-1 timeline-title">End</h5>
                      <p className="text-muted small mb-0">
                        Expected to end at {eventTime.split(" - ")[1]}.
                      </p>
                    </div>
                  </>
                )}
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
                    Date
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
                    Time
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
                    Location
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
                    Seat status
                  </span>
                  <span className="badge fw-bold px-2 py-1 seats-badge">
                    {seatsAvailable >= 0 ? seatsAvailable : 0} /{" "}
                    {seatsTotal} seats left
                  </span>
                </div>
              </div>

              <button className="btn w-100 py-3 fw-bold border-0 shadow-sm rounded-3 text-white btn-register-submit">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
