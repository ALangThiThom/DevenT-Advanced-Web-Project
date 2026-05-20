import api from "../utils/api";


export const getDashboardStats = async () => {
  try {
    const response = await api.get("/organizer/dashboard-stats");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};


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
