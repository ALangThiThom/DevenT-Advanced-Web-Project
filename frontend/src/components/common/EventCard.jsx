import Badge from "./Badge";
import "../../pages/styles/eventCard.css";

const EventCard = ({ event }) => {
  const { name, date_time, location, category, image, description, capacity, status, status_code } = event;

  return (
    <div className="event-card">
      <div className="event-card__image">
        <img src={image} alt={name} />
        <Badge label={category} />
      </div>

      <div className="event-card__body">
        <p className="event-card__date">
          <svg className="event-card__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          {date_time}
        </p>
        
        <h3 className="event-card__title">{name}</h3>
        <p className="event-card__description">{description}</p>
        <hr className="event-card__divider" />
        <div className="event-card__footer">
          <p className="event-card__location">
            <svg className="event-card__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}
          </p>
          <div className="event-card__status-group">
            <span className={`event-card__status ${status_code}`}>{status}</span>
            <span className="event-card__capacity">
              {capacity > 0 ? `${capacity} chỗ` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;