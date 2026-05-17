import { useNavigate } from "react-router-dom";
import "../../pages/styles/organizerCTA.css";

const OrganizerCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="organizer-cta">
      <div className="organizer-cta__container">
        <div className="organizer-cta__content">
          <p className="organizer-cta__subtitle">DÀNH CHO BAN TỔ CHỨC</p>
          <h2 className="organizer-cta__title">Bạn muốn tổ chức sự kiện?</h2>
          <p className="organizer-cta__description">
            Tạo và quản lý sự kiện của bạn một cách dễ dàng với DeVenT!
          </p>
          <div className="organizer-cta__actions">
            <button
              onClick={() => navigate("/organizer/register")}
              className="btn-cta btn-cta--primary"
            >
              Bắt đầu tổ chức
            </button>
            <button className="btn-cta btn-cta--outline">Tìm hiểu thêm</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerCTA;
