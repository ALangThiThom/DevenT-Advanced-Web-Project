import EventCard from "../eventCard/EventCard";
import useEvents from "../../hooks/useEvents";

const FeaturedEvents = () => {
  const { events, loading } = useEvents();
  return (
    <section className="featured-events">
      <div className="featured-events__header">
        <h2>Featured Events</h2>
        <a href="/events" className="featured-events__view-all">
          View all 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="featured-events__grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedEvents;