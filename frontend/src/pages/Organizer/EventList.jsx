import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrganizerEvents } from "../../services/eventService";
import styles from "./styles/Organizer.module.css";

export default function EventList() {
  const location = useLocation();
  const [eventsData, setEventsData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  const statusParam =
    new URLSearchParams(location.search).get("status") || "draft";
  const validStatuses = ["draft", "published", "cancelled", "ended"];
  const currentStatus = validStatuses.includes(statusParam)
    ? statusParam
    : "draft";

  useEffect(() => {
    fetchEvents();
  }, [location.search]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getOrganizerEvents({ page: 1, status: currentStatus });
      setEventsData(data.events);
      setMeta(data.meta);
    } catch (error) {
      console.error("Unable to load event list");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Hàm tính toán phần trăm cho Progress Bar
  const calculateProgress = (registrations, capacity) => {
    if (!capacity) return 0;
    const percent = Math.round((registrations / capacity) * 100);
    return percent > 100 ? 100 : percent;
  };

  // Hàm chọn màu sắc cho Progress Bar dựa trên Status
  const getProgressColor = (status) => {
    if (status === "published") return "#22c55e"; // green-500
    if (status === "cancelled") return "#ef4444"; // red-500
    return "#9ca3af"; // gray-400 (draft)
  };

  const pageTitle =
    currentStatus === "draft"
      ? "Draft Events"
      : currentStatus === "published"
        ? "Published Events"
        : currentStatus === "cancelled"
          ? "Cancelled Events"
          : "Ended Events";

  const showDraftActions = currentStatus === "draft";

  return (
    <div className={styles.tableContainer}>
      {/* Table Header với nút Filter */}
      <div className={styles.tableHeader}>
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            margin: 0,
            color: "var(--on-surface)",
          }}
        >
          {pageTitle}
        </h2>
        <button className={styles.secondaryBtn}>
          <i className="fa-solid fa-filter" style={{ fontSize: "14px" }}></i>{" "}
          Filter
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div
          style={{
            padding: "3rem",
            textAlign: "center",
            color: "var(--on-surface-variant)",
          }}
        >
          <i className="fa-solid fa-circle-notch fa-spin fa-2x mb-2"></i>
          <p>Loading events...</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className={styles.eventTable}>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Status</th>
                <th>Registration</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventsData?.length > 0 ? (
                eventsData.map((event) => {
                  // Sử dụng capacity thực tế từ DB, nếu không có thì mặc định là 0
                  const capacity = event.capacity || 0;
                  const registered = event.registrations_count || 0;
                  const progressPercent = calculateProgress(
                    registered,
                    capacity,
                  );

                  return (
                    <tr key={event.id} className={styles.tableRow}>
                      {/* Cột Event Name có kèm hình đại diện */}
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "4px",
                              backgroundColor: "#E5E7EB",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* Dùng icon ảnh làm placeholder nếu không có ảnh thật */}
                            <i
                              className="fa-regular fa-image"
                              style={{ color: "#9CA3AF" }}
                            ></i>
                          </div>
                          <span
                            style={{
                              fontWeight: "500",
                              fontSize: "0.875rem",
                              color: "var(--on-surface)",
                            }}
                          >
                            {event.title}
                          </span>
                        </div>
                      </td>

                      <td style={{ color: "var(--on-surface-variant)" }}>
                        {formatDate(event.start_time)}
                      </td>

                      <td style={{ color: "var(--on-surface-variant)" }}>
                        {event.category?.name || "Uncategorized"}
                      </td>

                      <td>
                        <span
                          className={
                            event.status === "published"
                              ? styles.badgePublished
                              : event.status === "cancelled"
                                ? styles.badgeCancelled
                                : styles.badgeDraft
                          }
                        >
                          {event.status
                            ? event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)
                            : "Draft"}
                        </span>
                      </td>

                      {/* Cột Registration với Progress Bar chuẩn Tailwind */}
                      <td>
                        {event.status === "draft" ? (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--on-surface-variant)",
                              fontStyle: "italic",
                            }}
                          >
                            Not started
                          </span>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.25rem",
                              width: "128px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "10px",
                                color: "var(--on-surface-variant)",
                                fontWeight: "500",
                              }}
                            >
                              <span>{progressPercent}%</span>
                              <span>
                                {registered}/{capacity}
                              </span>
                            </div>
                            <div
                              style={{
                                height: "6px",
                                width: "100%",
                                backgroundColor: "#F3F4F6",
                                borderRadius: "9999px",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  backgroundColor: getProgressColor(
                                    event.status,
                                  ),
                                  borderRadius: "9999px",
                                  width: `${progressPercent}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Cột Actions với hiệu ứng Group-Hover */}
                      <td style={{ textAlign: "right" }}>
                        {showDraftActions ? (
                          <div className={styles.actionGroup}>
                            <button
                              className={styles.actionBtn}
                              title="Edit Event"
                            >
                              <i
                                className="fa-solid fa-pen-to-square"
                                style={{ fontSize: "16px" }}
                              ></i>
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
                              title="Delete Event"
                            >
                              <i
                                className="fa-solid fa-trash-can"
                                style={{ fontSize: "16px" }}
                              ></i>
                            </button>
                          </div>
                        ) : (
                          <span
                            style={{
                              color: "var(--on-surface-variant)",
                              fontSize: "0.85rem",
                            }}
                          >
                            No actions
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Trạng thái trống (Empty State) */
                <tr>
                  <td
                    colSpan="6"
                    style={{ padding: "4rem 2rem", textAlign: "center" }}
                  >
                    <div
                      style={{
                        color: "var(--on-surface-variant)",
                        marginBottom: "1rem",
                      }}
                    >
                      <i className="fa-regular fa-folder-open fa-3x"></i>
                    </div>
                    <h4
                      style={{
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                        color: "var(--on-surface)",
                      }}
                    >
                      No events found
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--on-surface-variant)",
                      }}
                    >
                      You haven't created any events yet. Click "Create New
                      Event" to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Phân trang */}
      {!loading && eventsData?.length > 0 && (
        <div
          style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--border-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F9FAFB",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "500",
              color: "var(--on-surface-variant)",
            }}
          >
            Showing {meta?.from || 0} to {meta?.to || 0} of {meta?.total || 0}{" "}
            events
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className={styles.secondaryBtn}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "0.75rem",
                opacity: 0.5,
                cursor: "not-allowed",
              }}
              disabled
            >
              Previous
            </button>
            <button
              className={styles.secondaryBtn}
              style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
