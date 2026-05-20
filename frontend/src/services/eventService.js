import api from "../utils/api";

/**
 * Fetch dashboard stats (total stats and 4 latest events)
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/organizer/dashboard-stats");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

/**
 * Fetch paginated organizer events
 */
export const getOrganizerEvents = async (page = 1) => {
  try {
    const response = await api.get(`/organizer/events?page=${page}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching event list:", error);
    throw error;
  }
};

export const getOrganizerEventById = async (id) => {
  try {
    const response = await api.get(`/organizer/events/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching event details ${id}:`, error);
    throw error;
  }
};

export const getPublicEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching public event ${id}:`, error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  const response = await api.post("/organizer/events", eventData);
  return response.data;
};
