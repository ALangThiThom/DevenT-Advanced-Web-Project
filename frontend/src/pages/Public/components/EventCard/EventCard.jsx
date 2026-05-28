import { Link } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const formatEventDateTime = (rawDateTime) => {
    if (!rawDateTime) return "";
    const parsedDate = new Date(rawDateTime.endsWith('Z') ? rawDateTime : rawDateTime + 'Z');
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const month = monthNames[parsedDate.getMonth()];
    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
    return `${day} ${month} • ${hours}:${minutes}`;
  };

  const capacity = event.capacity || 0;
  const remainingSpots = event.remaining_spots ?? (capacity - (event.registered_count ?? event.registrations_count ?? 0));

  return (
    <Link
      to={`/events/${event.id}`}
      className="event-card-link"
      style={{ textDecoration: "none" }}
    >
      <div className="event-card">
        <div className="event-card__banner">
          <div className="event-card__image-placeholder"></div>
          <span className="event-card__tag">
            {event.category?.name || "Uncategorized"}
          </span>
        </div>

        <div className="event-card__body">
          <div className="event-card__date-row">
            <span className="event-card__icon">📅</span>
            <span className="event-card__date-text">
              {formatEventDateTime(event.start_time)}
            </span>
          </div>

          <h3 className="event-card__title">{event.title}</h3>
          <p className="event-card__desc">{event.description}</p>

          <div className="event-card__footer">
            <div className="event-card__location">
              <span className="event-card__icon">📍</span>
              <span className="event-card__location-text">
                {event.location}
              </span>
            </div>

            <div
              className="event-card__seats-badge"
              style={
                remainingSpots === 0
                  ? { color: "red", fontWeight: "bold" }
                  : undefined
              }
            >
              {remainingSpots === 0
                ? "Out of seats"
                : `${remainingSpots} / ${capacity} seats left`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
