import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "../styles/organizerRegister.css";

export default function OrganizerLogin() {
  const { credentials, handleChange, handleLogin, loading, error } =
    useLogin("Organizer");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="register-page">
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
            <span className="text-muted me-2">Chưa có tài khoản?</span>
            <Link
              to="/organizer/register"
              className="text-success fw-bold text-decoration-none"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-fluid bg-eventhub py-5 min-vh-100">
        <div className="container py-lg-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white pe-lg-5 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">DevenT</h1>
              <p className="lead mb-5 opacity-75">
                Đăng nhập vào không gian làm việc của Ban tổ chức để tiếp tục
                quản lý các sự kiện tuyệt vời của bạn.
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

            <div className="col-lg-5 offset-lg-1">
              <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5">
                <h3
                  className="fw-bold text-center mb-4"
                  style={{ color: "#004d3d" }}
                >
                  Đăng nhập Ban tổ chức
                </h3>
                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control bg-light py-2"
                      placeholder="your@email.com"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control bg-light py-2"
                      placeholder="Mật khẩu"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-eventhub bg-eventhub text-white w-100 py-2 fw-bold shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <Link
                    to="#"
                    className="text-muted small text-decoration-none"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
