
import { Routes, Route } from "react-router-dom";


import PublicLayout from "./layouts/PublicLayout";
import OrganizerLayout from "./layouts/OrganizerLayout";


import Home from "./pages/Public/Home";


import AttendeeLogin from "./pages/Attendee/Login";
import AttendeeRegister from "./pages/Attendee/Register";
import AttendeeDashboard from "./pages/Attendee/Dashboard";


import OrganizerLogin from "./pages/Organizer/Login";
import OrganizerRegister from "./pages/Organizer/Register";
import OrganizerDashboard from "./pages/Organizer/Dashboard";
import EventList from "./pages/Organizer/EventList";


import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>


      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>



      <Route path="/attendee/login" element={<AttendeeLogin />} />
      <Route path="/attendee/register" element={<AttendeeRegister />} />
      <Route path="/organizer/login" element={<OrganizerLogin />} />
      <Route path="/organizer/register" element={<OrganizerRegister />} />


      <Route
        path="/attendee/dashboard"
        element={
          <PrivateRoute allowedRole="attendee">
            <AttendeeDashboard />
          </PrivateRoute>
        }
      />


      <Route
        path="/organizer"
        element={
          <PrivateRoute allowedRole="organizer">
            <OrganizerLayout />
          </PrivateRoute>
        }
      >

        <Route path="dashboard" element={<OrganizerDashboard />} />


        <Route path="events" element={<EventList />} />
      </Route>
    </Routes>
  );
}

export default App;