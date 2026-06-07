import { useState } from "react";
import CategorySection from "../components/CategorySection/CategorySection";
import EventCard from "../components/EventCard/EventCard";
import useEvents from "../../../hooks/useEvents";
import "./EventsPage.css";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { events, loading } = useEvents(selectedCategory);

  // Limit to maximum 16 events
  const displayedEvents = events.slice(0, 16);

  return (
    <>
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section className="events-page">
        <div className="events-page__header">
          <h2>All Events</h2>
          <p className="events-page__subtitle">
            {displayedEvents.length} event
            {displayedEvents.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {loading ? (
          <div className="events-page__loading">
            <p>Loading events...</p>
          </div>
        ) : displayedEvents.length > 0 ? (
          <div className="events-page__grid">
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="events-page__empty">
            <p className="text-muted">
              No events found for the selected category.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
