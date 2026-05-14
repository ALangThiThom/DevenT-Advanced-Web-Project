import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/authService";

export const useRegister = (initialRole) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", // Quan trọng cho logic 'confirmed' của Laravel
    role: initialRole,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrors({});
    try {
      const data = await registerService(formData);
      localStorage.setItem("token", data.access_token);
      alert("Đăng ký thành công!");
      // Chuyển hướng dựa trên role
      const path =
        formData.role === "Attendee"
          ? "/attendee/dashboard"
          : "/organizer/dashboard";
      navigate(path);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        alert("Đăng ký thất bại, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleRegister, loading, errors };
};
