import { Link } from "react-router-dom";
import "../../pages/styles/footer.css";
const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__column">
        <h3 className="footer__logo">EventHub</h3>
        <p className="footer__description">
          Nền tảng kết nối cộng đồng qua các sự kiện ý nghĩa
        </p>
        <div className="footer__socials">
          <a href="#" className="footer__social-link"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="footer__social-link"><i className="fab fa-twitter"></i></a>
          <a href="#" className="footer__social-link"><i className="fab fa-instagram"></i></a>
          <a href="#" className="footer__social-link"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      {/* Cột 2: Liên kết nhanh */}
      <div className="footer__column">
        <h4 className="footer__title">LIÊN KẾT NHANH</h4>
        <ul className="footer__list">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/events">Khám phá sự kiện</Link></li>
          <li><Link to="/categories">Danh mục</Link></li>
          <li><Link to="/about">Về chúng tôi</Link></li>
        </ul>
      </div>
      <div className="footer__column">
        <h4 className="footer__title">HỖ TRỢ</h4>
        <ul className="footer__list">
          <li><Link to="/support">Trung tâm trợ giúp</Link></li>
          <li><Link to="/safety">Quy tắc an toàn</Link></li>
          <li><Link to="/terms">Điều khoản dịch vụ</Link></li>
          <li><Link to="/privacy">Chính sách bảo mật</Link></li>
        </ul>
      </div>
      <div className="footer__column">
        <h4 className="footer__title">NEWSLETTER</h4>
        <div className="footer__newsletter">
          <input 
            type="email" 
            placeholder="Địa chỉ email" 
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
        © 2026 EventHub. Kết nối cộng đồng thông qua các trải nghiệm trực tiếp.
      </p>
    </div>
  </footer>
);

export default Footer;