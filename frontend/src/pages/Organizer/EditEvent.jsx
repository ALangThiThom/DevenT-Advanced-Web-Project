import React from "react";
import { useParams } from "react-router-dom";
import EventForm from "./components/EventForm";

const EditEvent = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <p style={{ color: "var(--on-surface-variant)" }}>
          Invalid event ID. Please try again.
        </p>
      </div>
    );
  }

  return <EventForm eventId={id} isEditMode={true} />;
};

export default EditEvent;
