import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const useLogin = (expectedRole) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await loginService(credentials);

      // Kiểm tra chéo phân quyền theo yêu cầu của PRD
      if (data.user.role !== expectedRole) {
        setError("Sai cổng đăng nhập. Vui lòng kiểm tra lại vai trò của bạn.");
        return;
      }

      login(data.user, data.access_token);
      const path =
        expectedRole === "Attendee"
          ? "/attendee/dashboard"
          : "/organizer/dashboard";
      navigate(path);
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return { credentials, handleChange, handleLogin, loading, error };
};
