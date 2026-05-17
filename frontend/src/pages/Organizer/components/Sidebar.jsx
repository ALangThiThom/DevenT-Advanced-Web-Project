import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import styles from "../Organizer.module.css";

const Sidebar = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className={styles.sidebar}>
      {/* Brand Header */}
      <div className={styles.brandHeader}>
        <div className={styles.logoIcon}>
          <i className="fa-solid fa-circle-nodes" style={{ fontSize: "20px" }}></i>
        </div>
        <span className="fs-5 fw-bold" style={{ color: "var(--on-surface)", letterSpacing: "-0.025em" }}>
          EventHub
        </span>
      </div>

      {/* Primary CTA */}
      <button className={styles.primaryBtn}>
        <i className="fa-solid fa-plus"></i>
        Create New Event
      </button>

      {/* Navigation Groups */}
      <nav style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        
        {/* Group 1: Management */}
        <div className={styles.navGroup}>
          <span className={styles.navGroupTitle}>Management</span>
          <Link to="/organizer/dashboard" className={`${styles.navLink} ${location.pathname.includes("dashboard") ? styles.navLinkActive : ""}`}>
            <i className="fa-solid fa-chart-pie fa-fw"></i>
            Dashboard
          </Link>
          <Link to="/organizer/events" className={`${styles.navLink} ${location.pathname.includes("events") ? styles.navLinkActive : ""}`}>
            <i className="fa-regular fa-calendar-days fa-fw"></i>
            My Events
          </Link>
        </div>

        {/* Group 2: Data */}
        <div className={styles.navGroup}>
          <span className={styles.navGroupTitle}>Data</span>
          <Link to="/organizer/attendees" className={`${styles.navLink} ${location.pathname.includes("attendees") ? styles.navLinkActive : ""}`}>
            <i className="fa-solid fa-users fa-fw"></i>
            Attendance
          </Link>
          <Link to="/organizer/reviews" className={`${styles.navLink} ${location.pathname.includes("reviews") ? styles.navLinkActive : ""}`}>
            <i className="fa-regular fa-comments fa-fw"></i>
            Reviews
          </Link>
        </div>
      </nav>

      {/* Footer Nav */}
      <div className={styles.footerNav}>
        <Link to="/organizer/help" className={styles.navLink}>
          <i className="fa-regular fa-circle-question fa-fw"></i>
          Help Center
        </Link>
        <button onClick={logout} className={styles.navLink} style={{ color: "#ef4444", border: "none", background: "transparent", width: "100%", textAlign: "left", cursor: "pointer" }}>
          <i className="fa-solid fa-arrow-right-from-bracket fa-fw"></i>
          <span style={{ fontWeight: "500" }}>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;