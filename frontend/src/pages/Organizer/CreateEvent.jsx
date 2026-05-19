import React from "react";
import useCreateEvent from "../../hooks/useCreateEvent";
import useCategories from "../../hooks/useCategories";
import "./CreateEvent.css";

const CreateEvent = () => {
  // 1. Invoke custom hook to handle form lifecycle and states
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useCreateEvent();

  // 2. Fetch event categories dynamic data from backend hook
  const { categories } = useCategories();

  return (
    <div className="create-event-container">
      <div className="create-event-header">
        <h2>Create New Event</h2>
        <p>
          Fill in the basic information below to save this event as a Draft.
        </p>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>
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

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Processing..." : "Save as Draft"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
