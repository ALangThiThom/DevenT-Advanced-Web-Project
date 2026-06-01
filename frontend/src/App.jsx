import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import OrganizerLayout from "./layouts/OrganizerLayout";
import AttendeeLayout from "./layouts/AttendeeLayout";

// Pages - Public
import Home from "./pages/Public/Home";
import SearchPage from "./pages/Public/SearchPage/SearchPage";
import EventDetail from "./pages/Attendee/EventDetail"; // Giữ lại từ file 1
import About from "./pages/Public/About/About";
import Contact from "./pages/Public/Contact/Contact";

// Pages - Attendee
import AttendeeLogin from "./pages/Attendee/Login";
import AuthCallback from "./pages/Attendee/AuthCallback";
import AttendeeRegister from "./pages/Attendee/Register";
import AttendeeDashboard from "./pages/Attendee/Dashboard";
import AttendeeProfile from "./pages/Attendee/Profile";
import EditProfile from "./pages/Attendee/EditProfile";

// Pages - Organizer
import OrganizerLogin from "./pages/Organizer/Login";
import OrganizerRegister from "./pages/Organizer/Register";
import OrganizerDashboard from "./pages/Organizer/Dashboard";
import EventList from "./pages/Organizer/EventList";
import CreateEvent from "./pages/Organizer/CreateEvent";
import EditEvent from "./pages/Organizer/EditEvent";

// Components
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Cấu trúc Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/attendee/login" element={<AttendeeLogin />} />
      <Route path="/attendee/register" element={<AttendeeRegister />} />
      <Route path="/organizer/login" element={<OrganizerLogin />} />
      <Route path="/organizer/register" element={<OrganizerRegister />} />
      <Route path="/auth/google/callback" element={<AuthCallback />} />

      {/* Attendee Protected Routes */}
      <Route element={<PublicLayout />}>
        <Route
          path="/attendee/dashboard"
          element={
            <PrivateRoute allowedRole="attendee">
              <AttendeeDashboard />
            </PrivateRoute>
          }
        />
      </Route>

      <Route element={<AttendeeLayout />}>
        <Route
          path="/attendee/profile"
          element={
            <PrivateRoute allowedRole="attendee">
              <AttendeeProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute allowedRole="attendee">
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Organizer Protected Routes với Nested Layout */}
      <Route
        path="/organizer"
        element={
          <PrivateRoute allowedRole="organizer">
            <OrganizerLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<OrganizerDashboard />} />
        <Route path="all-events" element={<EventList />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/:id/edit" element={<EditEvent />} />
      </Route>
    </Routes>
  );
}

export default App;
