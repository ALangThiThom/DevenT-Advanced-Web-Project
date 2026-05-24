import "./NavBar.css";
import { useAuthStore } from "../../../store/authStore";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="site-navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <h2>DevenT</h2>
        </div>
        <ul className="navbar__menu" role="list">
          <li > <a href="/"> Home</a> </li>
          <li>
            <a href="/events">Events</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="navbar__actions">
          {user ? (
            <>
              <p className="navbar__welcome">Hello, {user.name}!</p>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </>
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
