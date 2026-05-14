import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function PrivateRoute({ children, allowedRole }) {
  const { token, user } = useAuthStore();

  // 1. Nếu không có token (chưa đăng nhập), chuyển hướng về trang chủ
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2. Nếu có yêu cầu kiểm tra Role mà Role hiện tại không khớp
  if (allowedRole && user?.role !== allowedRole) {
    // Chuyển hướng về đúng Dashboard của Role đó
    if (user?.role === "Organizer")
      return <Navigate to="/organizer/dashboard" replace />;
    if (user?.role === "Attendee")
      return <Navigate to="/attendee/dashboard" replace />;

    // Fallback an toàn
    return <Navigate to="/" replace />;
  }

  // 3. Hợp lệ, cho phép truy cập component con
  return children;
}
