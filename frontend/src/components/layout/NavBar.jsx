
import "../../pages/styles/navbar.css"; 

const NavBar = () => {
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
          <a href="/attendee/login" className="btn-login">Đăng nhập</a>
          <a href="/attendee/register" className="btn-register">Đăng ký</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;