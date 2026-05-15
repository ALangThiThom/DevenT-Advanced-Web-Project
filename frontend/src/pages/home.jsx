import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark mb-3">
          Chào mừng bạn đến với DevenT
        </h1>
        <p className="lead text-muted">
          Vui lòng chọn cổng đăng nhập dành cho bạn
        </p>
      </div>

      <div className="d-flex gap-4">
        <button
          onClick={() => navigate("/attendee/login")}
          className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-4 shadow-sm"
        >
          Người tham gia (Attendee)
        </button>

        <button
          onClick={() => navigate("/organizer/login")}
          className="btn btn-success btn-lg px-5 py-3 fw-bold rounded-4 shadow-sm"
          style={{ backgroundColor: '#004d3d', borderColor: '#004d3d' }}
        >
          Ban tổ chức (Organizer)
        </button>
      </div>
    </div>
  );
};

export default Home;