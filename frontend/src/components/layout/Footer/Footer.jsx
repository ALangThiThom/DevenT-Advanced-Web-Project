import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__column">
        <h3 className="footer__logo">Devent</h3>
        <p className="footer__description">
          A platform connecting the community through meaningful events
        </p>
        <div className="footer__socials">
          <a href="#" className="footer__social-link">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="footer__social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="footer__social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="footer__social-link">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Column 2: Quick Links */}
      <div className="footer__column">
        <h4 className="footer__title">QUICK LINKS</h4>
        <ul className="footer__list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Explore Events</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </div>
      <div className="footer__column">
        <h4 className="footer__title">SUPPORT</h4>
        <ul className="footer__list">
          <li>
            <Link to="/support">Help Center</Link>
          </li>
          <li>
            <Link to="/safety">Safety Center</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className="footer__column">
        <h4 className="footer__title">NEWSLETTER</h4>
        <div className="footer__newsletter">
          <input
            type="email"
            placeholder="Email Address"
            className="footer__input"
          />
          <button type="button" className="footer__submit-btn">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
    <hr className="footer__divider" />
    <div className="footer__bottom">
      <p className="footer__copy">
        © 2026 DevenT. Connecting communities through live experiences.
      </p>
    </div>
  </footer>
);

export default Footer;
