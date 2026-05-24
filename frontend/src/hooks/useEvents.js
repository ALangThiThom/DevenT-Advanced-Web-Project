import { useState, useEffect } from "react";
import axios from "axios";

const useEvents = (categoryId = '', searchKeyword = '') => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/events", {
        params: { category_id: categoryId, search: searchKeyword } 
      });

      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  const loadData = async () => {
    await fetchEvents();
  };

  loadData();
}, [categoryId,searchKeyword]);

  return { events, loading };
};

export default useEvents;
