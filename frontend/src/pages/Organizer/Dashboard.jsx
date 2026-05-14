import { useAuthStore } from "../../store/authStore";

export default function OrganizerDashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="container py-5 text-center mt-5">
      <h1 className="text-success fw-bold">Trang Quản trị Ban tổ chức</h1>
      <p className="lead">
        Xin chào, <strong>{user?.name}</strong>!
      </p>
      <button onClick={logout} className="btn btn-danger mt-4 px-4 shadow-sm">
        Đăng xuất
      </button>
    </div>
  );
}
