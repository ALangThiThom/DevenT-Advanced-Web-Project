import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import "../styles/attendeeRegister.css";

export default function AttendeeRegister() {
  const { formData, handleChange, handleRegister, loading, errors } =
    useRegister("Attendee");

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="register-page attendee-page">
      {/* --- HEADER --- */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center fw-bold text-attendee"
            to="/"
          >
            <span className="bg-attendee-icon text-white px-2 py-1 rounded me-2">
              E
            </span>{" "}
            DevenT
          </Link>
          <div className="ms-auto d-none d-md-block">
            <span className="text-muted me-2">Đã có tài khoản?</span>
            <Link
              to="/attendee/login"
              className="text-attendee fw-bold text-decoration-none"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN HERO SECTION --- */}
      <div className="container-fluid bg-attendee py-5 min-vh-100">
        <div className="container py-lg-5">
          <div className="row align-items-center">
            {/* Left Column: Info */}
            <div className="col-lg-6 text-attendee pe-lg-5 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">DevenT</h1>
              <p className="lead mb-5 opacity-75 text-dark">
                Khám phá và tham gia hàng ngàn sự kiện cộng đồng hấp dẫn dành
                riêng cho bạn.
              </p>

              <div className="d-flex mb-4 text-dark">
                <div className="feature-icon me-3">🌍</div>
                <div>
                  <h5 className="fw-bold mb-1 text-attendee">
                    Đa dạng sự kiện
                  </h5>
                  <p className="small opacity-75 mb-0">
                    Từ công nghệ, nghệ thuật đến thể thao, luôn có sự kiện phù
                    hợp với bạn.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4 text-dark">
                <div className="feature-icon me-3">🤝</div>
                <div>
                  <h5 className="fw-bold mb-1 text-attendee">
                    Kết nối cộng đồng
                  </h5>
                  <p className="small opacity-75 mb-0">
                    Gặp gỡ và giao lưu với những người có cùng sở thích và đam
                    mê.
                  </p>
                </div>
              </div>

              <div className="d-flex text-dark">
                <div className="feature-icon me-3">🎟️</div>
                <div>
                  <h5 className="fw-bold mb-1 text-attendee">
                    Đăng ký dễ dàng
                  </h5>
                  <p className="small opacity-75 mb-0">
                    Chỉ với vài thao tác cơ bản, bạn đã sẵn sàng tham gia sự
                    kiện.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Register Form */}
            <div className="col-lg-5 offset-lg-1">
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-light">
                <h3 className="fw-bold text-center mb-4 text-attendee">
                  Tạo tài khoản tham gia của bạn
                </h3>
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control bg-white py-2 ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Họ và tên"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control bg-white py-2 ${errors.email ? "is-invalid" : ""}`}
                      placeholder="your@email.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className={`form-control bg-white py-2 ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Mật khẩu (tối thiểu 8 ký tự)"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control bg-white py-2"
                      placeholder="Xác nhận mật khẩu"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-attendee text-white w-100 py-2 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
