import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../services/eventService";

const useCreateEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data giữ nguyên cấu trúc, bao gồm cả mảng schedule
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start_time: "",
    end_time: "",
    capacity: "",
    category_id: "",
    schedule: [],
  });

  // --- XỬ LÝ NHẬP LIỆU CƠ BẢN ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // --- QUẢN LÝ LỊCH TRÌNH (SCHEDULE) ---
  const addScheduleItem = () => {
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { time: "", title: "", description: "" }],
    }));
  };

  const updateScheduleItem = (index, field, value) => {
    setFormData((prev) => {
      const newSchedule = [...prev.schedule];
      newSchedule[index] = { ...newSchedule[index], [field]: value };
      return { ...prev, schedule: newSchedule };
    });

    const errorKey = `schedule.${index}.${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: null }));
    }
  };

  const removeScheduleItem = (index) => {
    setFormData((prev) => {
      const newSchedule = [...prev.schedule];
      newSchedule.splice(index, 1);
      return { ...prev, schedule: newSchedule };
    });
  };

  // --- XỬ LÝ SUBMIT (LƯU NHÁP / ĐĂNG TẢI) ---
  const handleSubmit = async (e, finalStatus = "published") => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const payload = { ...formData, status: finalStatus };

    try {
      const response = await createEvent(payload);
      if (response.success || response.status === "success") {
        alert(
          finalStatus === "published"
            ? "Event published successfully!"
            : "Draft event saved successfully!",
        );
        navigate("/organizer/events");
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
        alert("Please check the form for errors highlighted in red.");
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
    addScheduleItem,
    updateScheduleItem,
    removeScheduleItem,
    handleSubmit,
  };
};

export default useCreateEvent;
