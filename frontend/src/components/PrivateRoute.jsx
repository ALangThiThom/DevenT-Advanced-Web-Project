import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function PrivateRoute({ children, allowedRole }) {
  const { token, user } = useAuthStore();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user?.role !== allowedRole.toLowerCase()) {
    if (user?.role === "organizer")
      return <Navigate to="/organizer/dashboard" replace />;
    if (user?.role === "attendee")
      return <Navigate to="/attendee/dashboard" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
}