import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";

const useCreateEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    capacity: "",
    category_id: "",
  });

  // Handle data updates as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Automatically clear the red validation error message when the user starts re-typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({}); // Reset errors before sending a new request

    try {
      const payload = { ...formData, status };
      const response = await createEvent(payload);
      if (response.success || response.status === "success") {
        alert(
          `Event ${status === "published" ? "published" : "saved as draft"} successfully!`,
        );
        navigate("/organizer/events"); // Đã sửa: Điều hướng về Danh sách sự kiện thay vì Dashboard
      }
    } catch (err) {
      console.error("Create Event Error:", err); // In chi tiết lỗi ra console
      // Catch 422 Validation errors returned from Laravel FormRequest
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        alert("A system error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useCreateEvent;
