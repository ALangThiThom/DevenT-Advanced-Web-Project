import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const useLogin = (expectedRole) => {
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);

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
      const data = await login(credentials);

      if (data.user.role !== expectedRole.toLowerCase()) {
        setError("Wrong login portal. Please check your role.");
        return;
      }

      loginAction(data.user, data.access_token);

      const path =
        expectedRole.toLowerCase() === "attendee"
          ? "/attendee/dashboard"
          : "/organizer/dashboard";
      navigate(path);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return { credentials, handleChange, handleLogin, loading, error };
};
