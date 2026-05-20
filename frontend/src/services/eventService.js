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

export const getOrganizerEvents = async ({ page = 1, status = "" } = {}) => {
  try {
    const params = new URLSearchParams({ page });
    if (status) {
      params.append("status", status);
    }

    const response = await api.get(`/organizer/events?${params.toString()}`);
    const paginator = response.data.data;

    return { events: paginator.data, meta: paginator };
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
