import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const registerService = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export default api;
