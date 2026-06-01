import { useState } from "react";
import "./NavBar.css";
import { useAuthStore } from "../../../store/authStore";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const homePath = user?.role === "attendee" ? "/attendee/dashboard" : "/";

  return (
    <nav className="site-navbar">
      <div className="navbar__container">
        {/* Nút Hamburger Menu (Chỉ hiển thị trên Mobile/Tablet) */}
        <button
          className={`navbar__toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className="navbar__logo">
          <Link to={homePath}>DevenT</Link>
        </div>
        <ul
          className={`navbar__menu ${isMenuOpen ? "is-open" : ""}`}
          role="list"
        >
          <li>
            <Link to={homePath}>Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="navbar__actions">
          {user ? (
            <UserMenu user={user} logout={logout} />
          ) : (
            <>
              <a href="/attendee/login" className="btn-login">
                Login
              </a>
              <a href="/attendee/register" className="btn-register">
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
