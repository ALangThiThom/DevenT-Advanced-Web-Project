import { useState, useEffect } from "react";
import axios from "axios";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/events")
      .then(res => setEvents(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
};

export default useEvents;