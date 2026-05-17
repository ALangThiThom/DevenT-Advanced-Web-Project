
import "../../pages/styles/navbar.css";
import { useAuthStore } from "../../store/authStore";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="site-navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <h2>DeVenT</h2>
        </div>
        <ul className="navbar__menu"  role="list">
          <li className="active">Trang chủ</li>
          <li><a href="/events">Sự kiện</a></li>
          <li><a href="/about">Giới thiệu</a></li>
          <li><a href="/contact">Liên hệ</a></li>
        </ul>
        <div className="navbar__actions">
          {user?.name !== null ? (
            <>
              <p className="navbar__welcome">Xin chào, {user?.name}!</p>
              <button className="btn-logout" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <a href="/attendee/login" className="btn-login">Đăng nhập</a>
              <a href="/attendee/register" className="btn-register">Đăng ký</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;