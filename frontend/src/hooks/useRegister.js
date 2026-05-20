import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const useRegister = (initialRole) => {
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "", 
    role: initialRole.toLowerCase(),
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
      const data = await register(formData);
      
      loginAction(data.user, data.access_token);
      alert("Registration successful!");
      
      const path =
        formData.role === "attendee"
          ? "/attendee/dashboard"
          : "/organizer/dashboard";
      navigate(path);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("API error details:", error.response || error);
        alert(`Registration failed! Error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleRegister, loading, errors };
};