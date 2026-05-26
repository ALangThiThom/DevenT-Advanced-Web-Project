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