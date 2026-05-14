import { Routes, Route } from "react-router-dom";
import OrganizerRegister from "./pages/Organizer/Register";
import Home from "./pages/home";
import AttendeeRegister from "./pages/Attendee/Register";

function App() {
  return (
    <Routes>
      {/* Đường dẫn trang chủ */}
      <Route path="/" element={<Home />} />

      {/* Đăng ký attendee */}
      <Route path="/attendee/register" element={<AttendeeRegister />} />

      {/* Đăng ký organizer */}
      <Route path="/organizer/register" element={<OrganizerRegister />} />
    </Routes>
  );
}

export default App;
