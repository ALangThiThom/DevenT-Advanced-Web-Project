import React from "react";
import useEventForm from "../../../hooks/useEventForm";
import useCategories from "../../../hooks/useCategories";
import "../CreateEvent.css";

const EventForm = ({ eventId = null, isEditMode = false }) => {
  // 1. Invoke custom hook lấy các state và các hàm quản lý lịch trình, submit
  const {
    formData,
    errors,
    isLoading,
    isFetching,
    handleChange,
    addScheduleItem,
    updateScheduleItem,
    removeScheduleItem,
    handleSubmit,
  } = useEventForm(eventId);

  // 2. Fetch event categories dynamic data từ backend hook
  const { categories } = useCategories();

  // Hàm chặn nhấn Enter tự động gửi form
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Loading state khi fetch event data
  if (isFetching) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <i
          className="fa-solid fa-circle-notch fa-spin fa-2x"
          style={{ color: "var(--primary)" }}
        ></i>
        <p style={{ marginTop: "1rem", color: "var(--on-surface-variant)" }}>
          Loading event data...
        </p>
      </div>
    );
  }

  const formTitle = isEditMode ? "Edit Event" : "Create New Event";
  const formSubtitle = isEditMode
    ? "Update the event information below."
    : "Fill in the information below to build and publish your event.";

  return (
    <div className="create-event-container">
      <div className="create-event-header">
        <h2>{formTitle}</h2>
        <p>{formSubtitle}</p>
      </div>

      <form
        className="create-event-form"
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
      >
        {/* SECTION 1: BASIC INFORMATION */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label>
              Event Title <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Tech Conference 2026..."
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && (
              <span className="error-text">{errors.title[0]}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label>
                Category <span className="required">*</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={errors.category_id ? "input-error" : ""}
              >
                <option value="">-- Select Category --</option>
                {categories &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
              {errors.category_id && (
                <span className="error-text">{errors.category_id[0]}</span>
              )}
            </div>

            <div className="form-group half-width">
              <label>
                Maximum Capacity <span className="required">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                placeholder="e.g., 100"
                className={errors.capacity ? "input-error" : ""}
              />
              {errors.capacity && (
                <span className="error-text">{errors.capacity[0]}</span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: DATE & LOCATION */}
        <div className="form-section">
          <h3>Date & Location</h3>
          <div className="form-row">
            <div className="form-group half-width">
              <label>
                Start Time <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className={errors.start_time ? "input-error" : ""}
              />
              {errors.start_time && (
                <span className="error-text">{errors.start_time[0]}</span>
              )}
            </div>
            <div className="form-group half-width">
              <label>
                End Time <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className={errors.end_time ? "input-error" : ""}
              />
              {errors.end_time && (
                <span className="error-text">{errors.end_time[0]}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>
              Event Location <span className="required">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Building name, specific address..."
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && (
              <span className="error-text">{errors.location[0]}</span>
            )}
          </div>
        </div>

        {/* SECTION 3: DESCRIPTION */}
        <div className="form-section">
          <h3>Description</h3>
          <div className="form-group">
            <label>
              Detailed Description <span className="required">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Provide event details, agenda, schedules, or guest speakers..."
              className={errors.description ? "input-error" : ""}
            ></textarea>
            {errors.description && (
              <span className="error-text">{errors.description[0]}</span>
            )}
          </div>
        </div>

        {/* SECTION 4: EVENT SCHEDULE */}
        <div className="form-section">
          <div className="schedule-header">
            <div>
              <h3>Event Schedule</h3>
              <p className="schedule-description">
                Add timeline items for your event.
              </p>
            </div>
            <button
              type="button"
              className="btn-add-schedule"
              onClick={addScheduleItem}
            >
              + Add Item
            </button>
          </div>

          {formData.schedule.length === 0 ? (
            <div className="empty-schedule">
              <i className="fa-regular fa-calendar-plus"></i>
              <p>No schedule items added yet. Click "+ Add Item" to begin.</p>
            </div>
          ) : (
            formData.schedule.map((item, index) => (
              <div key={index} className="schedule-item-card">
                <div className="schedule-item-header">
                  <span className="schedule-badge">Item #{index + 1}</span>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeScheduleItem(index)}
                  >
                    <i className="fa-solid fa-trash-can"></i> Remove
                  </button>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label>
                      Time <span className="required">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={item.time}
                      onChange={(e) =>
                        updateScheduleItem(index, "time", e.target.value)
                      }
                      className={
                        errors[`schedule.${index}.time`] ? "input-error" : ""
                      }
                    />
                    {errors[`schedule.${index}.time`] && (
                      <span className="error-text">
                        {errors[`schedule.${index}.time`][0]}
                      </span>
                    )}
                  </div>
                  <div className="form-group half-width">
                    <label>
                      Session Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateScheduleItem(index, "title", e.target.value)
                      }
                      placeholder="e.g., Opening Keynote"
                      className={
                        errors[`schedule.${index}.title`] ? "input-error" : ""
                      }
                    />
                    {errors[`schedule.${index}.title`] && (
                      <span className="error-text">
                        {errors[`schedule.${index}.title`][0]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group no-margin-bottom">
                  <label>Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateScheduleItem(index, "description", e.target.value)
                    }
                    rows="2"
                    placeholder="Brief description of this session..."
                    className={
                      errors[`schedule.${index}.description`]
                        ? "input-error"
                        : ""
                    }
                  ></textarea>
                  {errors[`schedule.${index}.description`] && (
                    <span className="error-text">
                      {errors[`schedule.${index}.description`][0]}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* SECTION 5: FORM ACTIONS */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel mr-auto"
            onClick={() => (window.history.back ? window.history.back() : null)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-draft"
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Save Draft"}
          </button>

          <button
            type="button"
            className="btn-next"
            onClick={(e) => handleSubmit(e, "published")}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Publish Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
