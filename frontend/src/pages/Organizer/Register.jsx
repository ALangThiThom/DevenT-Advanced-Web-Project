import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import "./Register.css"; // ĐÃ ĐỒNG BỘ

export default function OrganizerRegister() {
  const { formData, handleChange, handleRegister, loading, errors } =
    useRegister("Organizer");

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="register-page">
      {/* --- HEADER --- */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center fw-bold text-success"
            to="/"
          >
            <span className="bg-success text-white px-2 py-1 rounded me-2">
              E
            </span>{" "}
            DevenT
          </Link>
          <div className="ms-auto d-none d-md-block">
            <span className="text-muted me-2">Đã có tài khoản?</span>
            <Link
              to="/organizer/login"
              className="text-success fw-bold text-decoration-none"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MAIN HERO SECTION --- */}
      <div className="container-fluid bg-eventhub py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center">
            {/* Left Column: Info */}
            <div className="col-lg-6 text-white pe-lg-5 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">DevenT</h1>
              <p className="lead mb-5 opacity-75">
                Tổ chức các sự kiện hiệu quả hơn, nhiều người biết đến hơn với
                DevenT
              </p>

              <div className="d-flex mb-4">
                <div className="feature-icon me-3">📅</div>
                <div>
                  <h5 className="fw-bold mb-1">500+ Sự kiện</h5>
                  <p className="small opacity-75 mb-0">
                    Tổ chức các sự kiện hiệu quả hơn, nhiều người...
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="feature-icon me-3">👤</div>
                <div>
                  <h5 className="fw-bold mb-1">12K+ Thành viên</h5>
                  <p className="small opacity-75 mb-0">
                    Cộng đồng người dùng đông đảo và năng động...
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="feature-icon me-3">✨</div>
                <div>
                  <h5 className="fw-bold mb-1">Trải nghiệm tuyệt vời</h5>
                  <p className="small opacity-75 mb-0">
                    Dễ dàng quản lý và tương tác với người tham gia...
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Register Form */}
            <div className="col-lg-5 offset-lg-1">
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                <h3
                  className="fw-bold text-center mb-4"
                  style={{ color: "#004d3d" }}
                >
                  Tổ chức sự kiện cộng đồng của bạn
                </h3>
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control bg-light py-2 ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Tên tổ chức"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control bg-light py-2"
                      placeholder="your@email.com"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <input
                      type="password"
                      className="form-control bg-light py-2"
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control bg-light py-2"
                      placeholder="Xác nhận mật khẩu"
                      name="password_confirmation"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-eventhub bg-eventhub text-white w-100 py-2 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Tạo tài khoản"}
                  </button>
                </form>
                <p className="small text-center mt-4 text-muted">
                  Bằng việc đăng ký, bạn đã đồng ý với DevenT về{" "}
                  <Link
                    to="#"
                    className="text-dark fw-bold text-decoration-none"
                  >
                    Điều khoản
                  </Link>{" "}
                  và{" "}
                  <Link
                    to="#"
                    className="text-dark fw-bold text-decoration-none"
                  >
                    Chính sách bảo mật
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}