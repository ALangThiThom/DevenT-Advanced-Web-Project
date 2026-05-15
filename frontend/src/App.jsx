import { Routes, Route } from "react-router-dom";
import OrganizerRegister from "./pages/Organizer/Register";
import Home from "./pages/Home";
import AttendeeRegister from "./pages/Attendee/Register";
import OrganizerLogin from "./pages/Organizer/Login";
import AttendeeLogin from "./pages/Attendee/Login";
import PrivateRoute from "./components/PrivateRoute";
import OrganizerDashboard from "./pages/Organizer/Dashboard";
import AttendeeDashboard from "./pages/Attendee/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/attendee/register" element={<AttendeeRegister />} />
      <Route path="/attendee/login" element={<AttendeeLogin />} />
      <Route path="/organizer/register" element={<OrganizerRegister />} />
      <Route path="/organizer/login" element={<OrganizerLogin />} />

      <Route
        path="/organizer/dashboard"
        element={
          <PrivateRoute allowedRole="organizer">
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/attendee/dashboard"
        element={
          <PrivateRoute allowedRole="attendee">
            <AttendeeDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;