import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div className="container">
      <Link className="navbar-brand fw-bold text-success" to="/">
        EventHub
      </Link>

      <div className="d-flex align-items-center gap-3">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/">
              Trang chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/events">
              Khám phá sự kiện
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/categories">
              Danh mục
            </Link>
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-center gap-2">
        <Link className="text-decoration-none text-dark" to="/login">
          Đăng nhập
        </Link>
        <Link className="btn btn-success" to="/register">
          Đăng ký
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
