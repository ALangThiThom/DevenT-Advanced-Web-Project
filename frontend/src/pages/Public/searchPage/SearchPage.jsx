import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard"; 
import useEvents from "../../../hooks/useEvents"; 

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query") || "";
  const trimmedKeyword = keyword.trim();
  const { events, loading } = useEvents("", keyword);
  const getRelevanceScore = (event, searchKey) => {
    if (!searchKey) return 0;
    
    const key = searchKey.toLowerCase().trim();
    const title = (event.title || "").toLowerCase();
    const description = (event.description || "").toLowerCase();

    if (title === key)                  return 100; 
    if (title.startsWith(key))          return 75;  
    if (title.includes(key))            return 50;  
    if (description.includes(key))      return 25;  

    return 0; 
  };
  let displayEvents = [];

  if (trimmedKeyword.length >= 4 && events && events.length > 0) {
    displayEvents = [...events]
      .map(event => ({
        ...event,
        _score: getRelevanceScore(event, trimmedKeyword)
      }))
      .filter(event => event._score > 0)
      .sort((a, b) => b._score - a._score);
    }
  const renderMessage = () => {
    if (loading) return <p>Searching for matching events...</p>;
    if (trimmedKeyword.length > 0 && trimmedKeyword.length <= 3) {
      return (
        <p className="text-muted" style={{ fontSize: "16px", marginTop: "20px" }}>
          No events found matching your search criteria. Please try another keyword!
        </p>
      );
    }
    if (trimmedKeyword.length >= 4 && displayEvents.length === 0) {
      return (
        <p className="text-muted" style={{ fontSize: "16px", marginTop: "20px" }}>
          No events found matching your search criteria. Please try another keyword!
        </p>
      );
    }

    return null;
  };

  return (
    <div className="search-page container" style={{ padding: "40px 20px", minHeight: "60vh" }}>
      {renderMessage()}
      {!loading && trimmedKeyword.length >= 4 && displayEvents.length > 0 && (
        <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;