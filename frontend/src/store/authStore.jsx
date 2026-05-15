import { create } from "zustand";
import { logoutService } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, // Khởi tạo user từ localStorage nếu có
  token: localStorage.getItem("token") || null, // Khởi tạo token từ localStorage nếu có

  login: (user, token) => {
    localStorage.setItem("token", token); // Lưu token vào localStorage để giữ phiên đăng nhập
    localStorage.setItem("user", JSON.stringify(user)); // Lưu user để không bị mất khi F5
    set({ user, token }); // Cập nhật state
  },

  logout: async () => {
    try {
      await logoutService(); // Gọi API xóa token trên backend
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
    localStorage.removeItem("token"); // Xóa token khỏi localStorage khi đăng xuất
    localStorage.removeItem("user"); // Xóa user khỏi localStorage
    set({ user: null, token: null }); // Xóa state
  },
}));
