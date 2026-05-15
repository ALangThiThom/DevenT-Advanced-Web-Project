import Badge from "./Badge";

const EventCard = ({ event }) => {
  const { name, date_time, location, category, image, description, capacity,status } = event;

  return (
    <div className="event-card">
      <div className="event-card__image">
        <img src={image} alt={name} />
        <Badge label={category} />
      </div>

      <div className="event-card__body">
        <p className="event-card__date">
          <span className="icon"></span> {date_time}
        </p>
        <h3 className="event-card__title">{name}</h3>
        <p className="event-card__description">{description}</p>
        <hr className="event-card__divider" />
        <div className="event-card__footer">
          <p className="event-card__location">
            <span className={`event-card__status ${status}`}>{status}</span>
            <span className="icon"></span> {location}
          </p>
          <span className="event-card__capacity">
            Còn {capacity} chỗ
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;