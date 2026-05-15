import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import "./Register.css"; // ĐÃ SỬA: Trỏ đúng vào file CSS cùng thư mục

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
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-body p-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-dark mb-2">Đăng nhập Ban tổ chức</h2>
                    <p className="text-muted">
                      Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
                    </p>
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
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
    </div>
  );
}