import { Routes, Route } from "react-router-dom";
import OrganizerRegister from "./pages/Organizer/Register"; // Đường dẫn tới file của bạn
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      {/* Đường dẫn trang chủ hiển thị file home.jsx */}
      <Route path="/" element={<Home />} />

      {/* Định nghĩa đường dẫn để truy cập vào trang đăng ký */}
      <Route path="/organizer/register" element={<OrganizerRegister />} />
    </Routes>
  );
}

export default App;
