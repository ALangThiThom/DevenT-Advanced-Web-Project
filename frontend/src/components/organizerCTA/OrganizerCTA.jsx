import { useNavigate } from "react-router-dom";
import "./organizerCTA.css";

const OrganizerCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="organizer-cta">
      <div className="organizer-cta__container">
        <div className="organizer-cta__content">
          <p className="organizer-cta__subtitle">FOR ORGANIZERS</p>
          <h2 className="organizer-cta__title">Want to host an event?</h2>
          <p className="organizer-cta__description">
            Create and manage your events easily with DeVenT!
          </p>
          <div className="organizer-cta__actions">
            <button
              onClick={() => navigate("/organizer/register")}
              className="btn-cta btn-cta--primary"
            >
              Start Organizing
            </button>
            <button className="btn-cta btn-cta--outline">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerCTA;
