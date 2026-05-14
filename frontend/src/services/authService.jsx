import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Dùng 127.0.0.1 để tránh các lỗi Network/CORS ẩn
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
