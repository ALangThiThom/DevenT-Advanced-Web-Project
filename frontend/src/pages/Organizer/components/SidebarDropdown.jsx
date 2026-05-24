import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Organizer.module.css";

const SidebarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentStatus =
    new URLSearchParams(location.search).get("status") || "draft";
  const isEventsRoute =
    location.pathname === "/organizer/events" ||
    location.pathname.startsWith("/organizer/events?");

  const subItems = [
    { label: "Draft Events", status: "draft" },
    { label: "Published Events", status: "published" },
    { label: "Cancelled Events", status: "cancelled" },
    { label: "Ended Events", status: "ended" },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (status) => {
    navigate(`/organizer/events?status=${status}`);
  };

  return (
    <div className={styles.subNavContainer}>
      <button
        type="button"
        className={`${styles.navLink} ${isEventsRoute ? styles.navLinkActive : ""}`}
        onClick={toggleMenu}
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
            const active = isEventsRoute && currentStatus === item.status;
            return (
              <button
                key={item.status}
                type="button"
                className={`${styles.subNavItem} ${active ? styles.subNavItemActive : ""}`}
                onClick={() => handleSelect(item.status)}
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
