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

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/organizer/events/${id}`, eventData);
  return response.data;
};

/**
 * Hủy một sự kiện (Chuyển trạng thái sang cancelled)
 * @param {number} id - ID của sự kiện cần hủy
 */
export const cancelEvent = async (id) => {
  try {
    const response = await api.patch(`/organizer/events/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling event with id ${id}:`, error);
    throw error;
  }
};

/**
 * Xóa một bản nháp sự kiện (chỉ cho phép xóa draft events)
 * @param {number} id - ID của sự kiện cần xóa
 */
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/organizer/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting event with id ${id}:`, error);
    throw error;
  }
};

/**
 * Register for an event
 * @param {number} id - Event ID
 */
export const registerForEvent = async (id) => {
  const response = await api.post("/registrations", { event_id: id });
  return response.data;
};

/**
 * Attendee: Cancel registration for an event
 * @param {number} id - Event ID
 */
export const cancelRegistration = async (id) => {
  const response = await api.patch(`/registrations/${id}/cancel`);
  return response.data;
};

/**
 * Fetch reviews for an event
 * @param {number} eventId - ID of the event
 */
export const getEventReviews = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}/reviews`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching reviews for event ${eventId}:`, error);
    throw error;
  }
};

/**
 * Submit a review for an event
 * @param {number} eventId - ID of the event
 * @param {object} reviewData - { rating, comment }
 */
export const submitEventReview = async (eventId, reviewData) => {
  const response = await api.post(`/events/${eventId}/reviews`, reviewData);
  return response.data;
};
