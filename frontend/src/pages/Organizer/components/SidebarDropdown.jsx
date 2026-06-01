import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "../styles/Organizer.module.css";

const SidebarDropdown = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isEventsRouteActive = location.pathname.startsWith("/organizer/events") || location.pathname.startsWith("/organizer/all-events");
  
  const [isOpen, setIsOpen] = useState(isEventsRouteActive);

  useEffect(() => {
    setIsOpen(isEventsRouteActive);
  }, [isEventsRouteActive]);

  const currentStatus = new URLSearchParams(location.search).get("status");

  const subItems = [
    { label: "All Events", path: "/organizer/all-events" },
    { label: "Draft Events", status: "draft" },
    { label: "Published Events", status: "published" },
    { label: "Cancelled Events", status: "cancelled" },
    { label: "Ended Events", status: "ended" },
  ];

  const handleNavigation = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (item.status) {
      navigate(`/organizer/events?status=${item.status}`);
    }
  };

  return (
    <div className={styles.subNavContainer}>
      <button
        type="button"
        className={`${styles.navLink} ${isEventsRouteActive ? styles.navLinkActive : ""}`}
        onClick={() => setIsOpen(prev => !prev)}
        style={{
          justifyContent: "space-between",
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: "0.5rem 0.75rem",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <i className="fa-regular fa-calendar-days fa-fw"></i>
          My Events
        </span>
        <i
          className={`fa-solid fa-chevron-${isOpen ? "down" : "right"} fa-fw`}
          style={{ fontSize: "12px" }}
        />
      </button>

      {isOpen && (
        <div className={styles.subNavList}>
          {subItems.map((item) => {
            let active = false;
            if (item.path) {
                active = location.pathname === item.path;
            } else if (item.status) {
                active = location.pathname.startsWith('/organizer/events') && currentStatus === item.status;
            }

            return (
              <button
                key={item.label}
                type="button"
                className={`${styles.subNavItem} ${active ? styles.subNavItemActive : ""}`}
                onClick={() => handleNavigation(item)}
              >
                <span
                  className={`${styles.subNavDot} ${active ? styles.subNavDotActive : ""}`}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
