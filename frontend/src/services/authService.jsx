import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 1. Interceptor cho Request: Tự động đính kèm Token vào Header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. Interceptor cho Response: Xử lý lỗi 401 (Token không hợp lệ / Hết hạn)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/"; // Đẩy về trang chủ để người dùng chọn lại Role đăng nhập
    }
    return Promise.reject(error);
  },
);

export const registerService = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};
export const loginService = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};
export const logoutService = async () => {
  const response = await api.delete("/logout");
  return response.data;
};

export default api;
