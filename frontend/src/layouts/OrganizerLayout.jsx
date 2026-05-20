import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../pages/Organizer/components/Sidebar";
import { useAuthStore } from "../store/authStore";
import styles from "../pages/Organizer/styles/Organizer.module.css";

export default function OrganizerLayout() {
  const location = useLocation();
  const { user } = useAuthStore();

  let pageTitle = "Dashboard Overview";
  if (location.pathname.includes("events")) pageTitle = "My Events";
  if (location.pathname.includes("attendees")) pageTitle = "Attendance";
  if (location.pathname.includes("reviews")) pageTitle = "Reviews";

  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.name || 'Organizer'}&background=4338CA&color=fff&rounded=true&bold=true`;

  return (
    <div className={styles.themeRoot}>
      <Sidebar />

      <header className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.125rem", fontWeight: "bold", color: "var(--on-surface)", margin: 0 }}>
            {pageTitle}
          </h1>
        </div>

        <div className={styles.searchBar}>
          <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--on-surface-variant)" }}></i>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search events, attendees..."
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.5rem 0.25rem 0.25rem", borderRadius: "9999px", border: "1px solid var(--border-main)", background: "transparent", cursor: "pointer" }}>
            <img alt="User profile avatar" className={styles.avatarImg} src={avatarUrl} />
            <i className="fa-solid fa-chevron-down" style={{ color: "var(--on-surface-variant)", fontSize: "0.875rem" }}></i>
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};