import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createEvent,
  updateEvent,
  getOrganizerEventById,
} from "../services/eventService";

const useEventForm = (eventId = null) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!eventId);
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

  // Fetch event data nếu là edit mode
  useEffect(() => {
    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setIsFetching(true);
      const eventData = await getOrganizerEventById(eventId);

      // Transform schedule data từ API format
      const scheduleData = eventData.schedule
        ? eventData.schedule.map((item) => ({
            time: item.time || "",
            title: item.title || "",
            description: item.description || "",
          }))
        : [];

      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
        location: eventData.location || "",
        start_time: eventData.start_time || "",
        end_time: eventData.end_time || "",
        capacity: eventData.capacity || "",
        category_id: eventData.category_id || "",
        schedule: scheduleData,
      });
    } catch (error) {
      console.error("Error fetching event data:", error);
      alert("Failed to load event data. Redirecting...");
      navigate("/organizer/events");
    } finally {
      setIsFetching(false);
    }
  };

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

  // --- XỬ LÝ SUBMIT (LƯU NHÁP / ĐĂNG TẢI / CẬP NHẬT) ---
  const handleSubmit = async (e, finalStatus = "published") => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const payload = { ...formData, status: finalStatus };

    try {
      let response;
      if (eventId) {
        // Edit mode
        response = await updateEvent(eventId, payload);
      } else {
        // Create mode
        response = await createEvent(payload);
      }

      if (response.success || response.status === "success") {
        const successMessage = eventId
          ? finalStatus === "published"
            ? "Event updated and published successfully!"
            : "Draft event updated successfully!"
          : finalStatus === "published"
            ? "Event published successfully!"
            : "Draft event saved successfully!";

        alert(successMessage);
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
    isFetching,
    handleChange,
    addScheduleItem,
    updateScheduleItem,
    removeScheduleItem,
    handleSubmit,
  };
};

export default useEventForm;
