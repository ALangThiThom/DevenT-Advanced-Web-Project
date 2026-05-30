import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPublicEventById, registerForEvent, getEventReviews, submitEventReview } from "../../services/eventService";
import { useAuthStore } from "../../store/authStore";
import "./styles/EventDetail.css";

/**
 * EventDetail Component
 * Displays the full details of a specific event for attendees.
 * Includes event schedule, location, remaining capacity, and allows
 * users to register for the event.
 */
export default function EventDetail() {
  const { id } = useParams();
  const { user } = useAuthStore();
  
  // State management for event data, loading status, and errors
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Toast notifications and registration button status
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isRegistering, setIsRegistering] = useState(false);

  // Review submission states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReviewedSuccess, setIsReviewedSuccess] = useState(false);

  // Check if current user has already reviewed this event
  const hasAlreadyReviewed = user && Array.isArray(reviews) && reviews.some(r => r.user_id === user.id);

  // Fetch event details whenever the component mounts or the ID changes
  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) {
        setError("Event ID is not provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch event details and reviews in parallel
        const [eventData, reviewsData] = await Promise.all([
          getPublicEventById(id),
          getEventReviews(id)
        ]);
        
        setEvent(eventData);
        setReviews(reviewsData);
      } catch (fetchError) {
        setError(
          fetchError?.response?.data?.message ||
            "Unable to load event details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  /**
   * Formats a raw date string into a readable format (e.g., "May 14, 2026").
   */
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  /**
   * Renders star ratings based on a number (1-5).
   */
  const renderStars = (rating, interactive = false, onRate = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`${i <= rating ? "text-warning" : "text-muted"} ${interactive ? "cursor-pointer" : ""}`}
          onClick={() => interactive && onRate && onRate(i)}
          style={{ cursor: interactive ? "pointer" : "default" }}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return <div className="fs-5">{stars}</div>;
  };

  /**
   * Handles the review submission process.
   */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (rating === 0) {
      setToast({ show: true, message: "Please select a star rating.", type: "danger" });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return;
    }

    if (!comment.trim()) {
      setToast({ show: true, message: "Please write a comment.", type: "danger" });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submitEventReview(id, { rating, comment });
      
      setToast({
        show: true,
        message: "Thank you! Your review has been submitted.",
        type: "success",
      });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);

      setIsReviewedSuccess(true);
      
      // Dynamically add the new review to the top of the list
      if (response.data) {
        setReviews(prev => [response.data, ...prev]);
      }
    } catch (err) {
      setToast({
        show: true,
        message: err?.response?.data?.message || "Failed to submit review. Ensure you are logged in as an attendee and registered for this event.",
        type: "danger",
      });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Formats start and end times into a readable time range (e.g., "10:00 AM - 12:00 PM").
   */
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

  /**
   * Handles the event registration process.
   * Performs capacity checks, triggers the API call, handles success/error
   * states via toast notifications, and updates local state instantly.
   */
  const handleRegister = async () => {
    if (!event) return;

    try {
      setIsRegistering(true); // Disable button and show loading text
      
      // Call the backend API to register the user
          const response = await registerForEvent(id);

          // Show success toast notification
          setToast({
            show: true,
            message: response.message,
            type: "success",
          });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      
      // Instantly update the local event state to reflect the new registration count
      // This automatically reduces the `seatsAvailable` variable without reloading the page
      setEvent(prev => ({
        ...prev,
        registrations_count: (prev.registrations_count || 0) + 1
      }));
    } catch (err) {
      setToast({
        show: true,
        message: err?.response?.data?.message || "Failed to register for the event. Please login first or check your network.",
        type: "danger",
      });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    } finally {
      setIsRegistering(false);
    }
  };

  /**
   * Renders the event's hero banner if a thumbnail URL is provided.
   */
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
  const eventCategory = event.category?.name || "Event";
  const eventLocation = event.location || "Unknown location";
  const eventAddress = event.address || event.location || "No detailed address";
  const eventDate = formatDate(event.start_time);
  const eventTime = formatTimeRange(event.start_time, event.end_time);

  return (
    <div className="w-100 bg-light min-vh-100 pb-5 event-detail-wrapper">
      
      {/* Toast Notification Container (Bootstrap 5 styling) */}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div 
          className={`toast align-items-center text-bg-${toast.type} border-0 ${toast.show ? 'show' : 'hide'}`} 
          role="alert" 
          aria-live="assertive" 
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {toast.message}
            </div>
            <button 
              type="button" 
              className="btn-close btn-close-white me-2 m-auto" 
              aria-label="Close" 
              onClick={() => setToast({ ...toast, show: false })}
            ></button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
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

            {/* Event Schedule Timeline */}
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

            {/* Rate & Review Form */}
            {event.status === 'ended' && !isReviewedSuccess && !hasAlreadyReviewed && (
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mt-4 bg-white text-start">
                <h3 className="fw-bold mb-4 event-section-heading">
                  Rate & Review Event
                </h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold text-muted small text-uppercase mb-2">Your Rating</label>
                    {renderStars(rating, true, (val) => setRating(val))}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="comment" className="form-label fw-bold text-muted small text-uppercase mb-2">Your Comment</label>
                    <textarea
                      id="comment"
                      className="form-control rounded-3 border-light-subtle bg-light p-3"
                      rows="4"
                      placeholder="Share your experience with this event..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      maxLength="300"
                    ></textarea>
                    <div className="text-end mt-2">
                      <small className={`${comment.length >= 300 ? 'text-danger' : 'text-muted'}`}>
                        {comment.length} / 300 characters
                      </small>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary px-5 py-2 fw-bold rounded-3 border-0 shadow-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            )}

            {/* Event Reviews Section */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mt-4 bg-white text-start">
              <h3 className="fw-bold mb-4 event-section-heading">
                Reviews ({reviews.length})
              </h3>
              
              {reviews.length > 0 ? (
                <div className="reviews-list">
                  {reviews.map((review, idx) => (
                    <div key={review.id || idx} className={`review-item ${idx !== reviews.length - 1 ? 'mb-4 pb-4 border-bottom' : ''}`}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold mb-0">{review.user?.name || "Anonymous"}</h6>
                          <small className="text-muted">{formatDate(review.created_at)}</small>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-secondary mb-0">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted mb-0">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>

          {/* Registration Widget / Sidebar */}
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
                    {seatsAvailable >= 0 ? seatsAvailable : 0} / {seatsTotal}{" "}
                    seats left
                  </span>
                </div>
              </div>

              {/* Registration Action Button */}
                <button 
                  className="btn w-100 py-3 fw-bold border-0 shadow-sm rounded-3 text-white btn-register-submit"
                  onClick={handleRegister}
                  disabled={isRegistering}
                >
                  {isRegistering
                    ? "Processing..."
                    : seatsAvailable <= 0
                      ? "Join Waitlist"
                      : "Register"}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
