import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/eventService";
import styles from "./Organizer.module.css";

export default function OrganizerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setDashboardData(data);
      } catch (error) {
        console.error("Unable to load dashboard overview information");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const calculateProgress = (registrations, capacity) => {
    const cap = capacity || 500;
    const percent = Math.round((registrations / cap) * 100);
    return percent > 100 ? 100 : percent;
  };

  return (
    <div>
      {loading ? (
        <div style={{ padding: "5rem", textAlign: "center", color: "var(--on-surface-variant)" }}>
          <i className="fa-solid fa-spinner fa-spin fa-2x mb-2"></i>
          <p>Loading overview metrics...</p>
        </div>
      ) : (
        <>
          {/* 1. KHU VỰC METRIC CARDS (TOTAL & REGISTRATIONS) */}
          <div className={styles.statsGrid}>
            {/* Card 1: Total Events */}
            <div className={styles.statCard}>
              <div className={styles.statInfo}>
                <h3>Total Events</h3>
                <p>{dashboardData?.stats?.total_events || 0}</p>
              </div>
              <div className={styles.statIconWrapper} style={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}>
                <i className="fa-solid fa-layer-group"></i>
              </div>
            </div>

            {/* Card 2: Active Events */}
            <div className={styles.statCard}>
              <div className={styles.statInfo}>
                <h3>Active Events</h3>
                <p>{dashboardData?.stats?.active_events || 0}</p>
              </div>
              <div className={styles.statIconWrapper} style={{ backgroundColor: "#ECFDF5", color: "#15803d" }}>
                <i className="fa-regular fa-calendar-check"></i>
              </div>
            </div>

            {/* Card 3: Total Registrations (Waitlist tracking point) */}
            <div className={styles.statCard}>
              <div className={styles.statInfo}>
                <h3>Total Registrations</h3>
                <p>{dashboardData?.stats?.total_registrations || 0}</p>
              </div>
              <div className={styles.statIconWrapper} style={{ backgroundColor: "#FFFBEB", color: "#b45309" }}>
                <i className="fa-solid fa-users-rectangle"></i>
              </div>
            </div>
          </div>

          {/* 2. KHU VỰC BẢNG HIỂN THỊ 4 SỰ KIỆN GẦN NHẤT */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0, color: "var(--on-surface)" }}>
                Recent Events Overview
              </h2>
              <Link to="/organizer/events" className={styles.secondaryBtn} style={{ textDecoration: "none", fontSize: "0.875rem" }}>
                View All Events <i className="fa-solid fa-arrow-right ms-1" style={{ fontSize: "12px" }}></i>
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className={styles.eventTable}>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Registration Progress</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.recent_events?.length > 0 ? (
                    dashboardData.recent_events.map((event) => {
                      const capacity = event.capacity || 500;
                      const registered = event.registrations_count || 0;
                      const progressPercent = calculateProgress(registered, capacity);

                      return (
                        <tr key={event.id} className={styles.tableRow}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifycontent: "center", flexShrink: 0 }}>
                                <i className="fa-regular fa-image" style={{ color: "#9CA3AF" }}></i>
                              </div>
                              <span style={{ fontWeight: "600", fontSize: "0.875rem" }}>{event.title}</span>
                            </div>
                          </td>
                          <td style={{ color: "var(--on-surface-variant)" }}>
                            {formatDate(event.created_at)}
                          </td>
                          <td>
                            <span className={event.status === 'published' ? styles.badgePublished : styles.badgeDraft}>
                              {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Draft'}
                            </span>
                          </td>
                          <td>
                            {event.status === 'draft' ? (
                              <span style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", fontStyle: "italic" }}>
                                Not started
                              </span>
                            ) : (
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", width: "140px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--on-surface-variant)" }}>
                                  <span>{progressPercent}%</span>
                                  <span>{registered}/{capacity}</span>
                                </div>
                                <div style={{ height: "6px", width: "100%", backgroundColor: "#F3F4F6", borderRadius: "9999px" }}>
                                  <div 
                                    style={{ 
                                      height: "100%", 
                                      backgroundColor: event.status === 'published' ? '#4338CA' : '#9ca3af', 
                                      borderRadius: "9999px", 
                                      width: `${progressPercent}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div className={styles.actionGroup}>
                              <button className={styles.actionBtn} title="Quick Edit">
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: "4rem 2rem", textAlign: "center" }}>
                        <div style={{ color: "var(--on-surface-variant)", marginBottom: "1rem" }}>
                          <i className="fa-solid fa-chart-line fa-3x"></i>
                        </div>
                        <h4 style={{ fontWeight: "600", color: "var(--on-surface)" }}>No activity registered</h4>
                        <p style={{ fontSize: "0.875rem", color: "var(--on-surface-variant)" }}>
                          Create your first community event to unlock dashboard analytics.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}