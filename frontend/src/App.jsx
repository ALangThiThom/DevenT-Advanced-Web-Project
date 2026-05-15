import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AttendeeRegister from "./pages/Attendee/Register";
import AttendeeLogin from "./pages/Attendee/Login";
import AttendeeDashboard from "./pages/Attendee/Dashboard";
import OrganizerRegister from "./pages/Organizer/Register";
import OrganizerLogin from "./pages/Organizer/Login";
import OrganizerDashboard from "./pages/Organizer/Dashboard";
import Layout from "./pages/Organizer/Layout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/attendee/register" element={<AttendeeRegister />} />
      <Route path="/attendee/login" element={<AttendeeLogin />} />
      <Route
        path="/attendee/dashboard"
        element={
          <PrivateRoute allowedRole="attendee">
            <AttendeeDashboard />
          </PrivateRoute>
        }
      />

      <Route path="/organizer/register" element={<OrganizerRegister />} />
      <Route path="/organizer/login" element={<OrganizerLogin />} />
      
      <Route
        path="/organizer"
        element={
          <PrivateRoute allowedRole="organizer">
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<OrganizerDashboard />} />
        {/* <Route path="events" element={<EventList />} /> */}
      </Route>
    </Routes>
  );
}

export default App;