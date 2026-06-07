import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../pages/Organizer/components/Sidebar";
import { useAuthStore } from "../store/authStore";
import styles from "../pages/Organizer/styles/Organizer.module.css";
import {
  EventFilterProvider,
  useEventFilters,
} from "../context/EventFilterContext";

const HeaderContent = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const { searchTerm, setSearchTerm } = useEventFilters();

  let pageTitle = "Dashboard Overview";
  if (location.pathname.includes("all-events")) pageTitle = "All Events";
  if (location.pathname.startsWith("/organizer/events"))
    pageTitle = "My Events";
  if (location.pathname.includes("attendees")) pageTitle = "Attendance";
  if (location.pathname.includes("reviews")) pageTitle = "Reviews";

  const showSearchBar =
    location.pathname.startsWith("/organizer/all-events") ||
    location.pathname.startsWith("/organizer/events");

  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.name || "Organizer"}&background=4338CA&color=fff&rounded=true&bold=true`;

  return (
    <header className={styles.header}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1
          style={{
            fontSize: "1.125rem",
            fontWeight: "bold",
            color: "var(--on-surface)",
            margin: 0,
          }}
        >
          {pageTitle}
        </h1>
      </div>

      {showSearchBar && (
        <div className={styles.searchBar}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--on-surface-variant)",
            }}
          ></i>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by event title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {!showSearchBar && <div style={{ marginLeft: "auto" }}></div>}

      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.25rem 0.5rem 0.25rem 0.25rem",
            borderRadius: "9999px",
            border: "1px solid var(--border-main)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <img
            alt="User profile avatar"
            className={styles.avatarImg}
            src={avatarUrl}
          />
        </button>
      </div>
    </header>
  );
};

export default function OrganizerLayout() {
  return (
    <EventFilterProvider>
      <div className={styles.themeRoot}>
        <Sidebar />
        <HeaderContent />
        <main className={styles.mainContent}>
          <div
            style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </EventFilterProvider>
  );
}
