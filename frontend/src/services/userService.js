import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const getAuthHeaders = () => {
  const raw = localStorage.getItem("auth-storage");
  if (!raw) return {};
  
  try {
    const parsed = JSON.parse(raw);
    const token = parsed?.state?.token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
};

export const getUserProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/user`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getRegisteredEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/attendee/events/registered`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getFinishedEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/attendee/events/finished`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getCancelledEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/attendee/events/cancelled`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};