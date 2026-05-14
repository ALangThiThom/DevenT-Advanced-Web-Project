import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";

export default function OrganizerRegister() {
  // Khởi tạo hook với vai trò mặc định là 'Organizer'
  const { formData, handleChange, handleRegister, loading, errors } =
    useRegister("Organizer");

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="auth-container">
      <h2>Đăng ký Ban tổ chức (Organizer)</h2>
      <p>Tạo tài khoản để bắt đầu tổ chức các sự kiện cộng đồng.</p>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Tên tổ chức / Cá nhân"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error-text">{errors.name[0]}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email liên hệ"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <span className="error-text">{errors.email[0]}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <span className="error-text">{errors.password[0]}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password_confirmation"
            placeholder="Xác nhận mật khẩu"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng ký tài khoản tổ chức"}
        </button>
      </form>

      <p className="auth-footer">
        Đã có tài khoản? <Link to="/organizer/login">Đăng nhập tại đây</Link>
      </p>
    </div>
  );
}
