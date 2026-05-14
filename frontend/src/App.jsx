import { Routes, Route } from "react-router-dom";
import OrganizerRegister from "./pages/Organizer/Register";
import Home from "./pages/home";
import AttendeeRegister from "./pages/Attendee/Register";
import OrganizerLogin from "./pages/Organizer/Login";
import AttendeeLogin from "./pages/Attendee/Login";
import PrivateRoute from "./components/PrivateRoute";
import OrganizerDashboard from "./pages/Organizer/Dashboard";
import AttendeeDashboard from "./pages/Attendee/Dashboard";

function App() {
  return (
    <Routes>
      {/* Đường dẫn trang chủ */}
      <Route path="/" element={<Home />} />

      {/* Đăng ký attendee */}
      <Route path="/attendee/register" element={<AttendeeRegister />} />

      {/* Đăng nhập attendee */}
      <Route path="/attendee/login" element={<AttendeeLogin />} />

      {/* Đăng ký organizer */}
      <Route path="/organizer/register" element={<OrganizerRegister />} />

      {/* Đăng nhập organizer */}
      <Route path="/organizer/login" element={<OrganizerLogin />} />

      {/* --- CÁC TRANG BẢO MẬT BỞI PRIVATE ROUTE --- */}
      <Route
        path="/organizer/dashboard"
        element={
          <PrivateRoute allowedRole="Organizer">
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/attendee/dashboard"
        element={
          <PrivateRoute allowedRole="Attendee">
            <AttendeeDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
