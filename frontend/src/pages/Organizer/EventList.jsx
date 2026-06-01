import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getOrganizerEvents,
  cancelEvent,
  deleteEvent,
} from "../../services/eventService";
import styles from "./styles/Organizer.module.css";
import { useEventFilters } from "../../context/EventFilterContext";
import useCategories from "../../hooks/useCategories";

export default function EventList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [eventsData, setEventsData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    eventId: null,
    eventTitle: "",
  });
  const [isCancelling, setIsCancelling] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    eventId: null,
    eventTitle: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Get filters from shared context
  const { debouncedSearchTerm, categoryId, setCategoryId } = useEventFilters();
  const { categories, loading: categoriesLoading } = useCategories();

  // Determine filtering logic based on route
  const isAllEventsPage = location.pathname.startsWith("/organizer/all-events");
  const statusParam = new URLSearchParams(location.search).get("status");
  const validStatuses = ["draft", "published", "cancelled", "ended"];
  const currentStatus = validStatuses.includes(statusParam)
    ? statusParam
    : isAllEventsPage
      ? ""
      : "draft";

  const getPageTitle = () => {
    if (isAllEventsPage) return "All Events";
    switch (currentStatus) {
      case "draft":
        return "Draft Events";
      case "published":
        return "Published Events";
      case "cancelled":
        return "Cancelled Events";
      case "ended":
        return "Ended Events";
      default:
        return "My Events";
    }
  };
  const pageTitle = getPageTitle();

  const prevStatusRef = useRef(currentStatus);
  const prevFilterRef = useRef({ debouncedSearchTerm, categoryId });

  useEffect(() => {
    const filtersChanged =
      prevFilterRef.current.debouncedSearchTerm !== debouncedSearchTerm ||
      prevFilterRef.current.categoryId !== categoryId;
    if (prevStatusRef.current !== currentStatus || filtersChanged) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }
    prevStatusRef.current = currentStatus;
    prevFilterRef.current = { debouncedSearchTerm, categoryId };
  }, [currentStatus, debouncedSearchTerm, categoryId, currentPage]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getOrganizerEvents({
          page: currentPage,
          status: currentStatus,
          search: debouncedSearchTerm,
          categoryId: categoryId,
        });
        setEventsData(data.events);
        setMeta(data.meta);
      } catch (error) {
        console.error("Unable to load event list", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentStatus, currentPage, debouncedSearchTerm, categoryId]);

  const handleOpenCancelModal = (event) => {
    if (event.status !== "published") return;
    setCancelModal({
      isOpen: true,
      eventId: event.id,
      eventTitle: event.title,
    });
  };

  const handleCloseCancelModal = () => {
    setCancelModal({ isOpen: false, eventId: null, eventTitle: "" });
  };

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelEvent(cancelModal.eventId);
      alert("Event cancelled successfully");
      setEventsData((prevEvents) =>
        prevEvents.map((ev) =>
          ev.id === cancelModal.eventId ? { ...ev, status: "cancelled" } : ev,
        ),
      );
      handleCloseCancelModal();
    } catch (error) {
      alert("Error: Cannot cancel the event. Please try again!");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleOpenDeleteModal = (event) => {
    if (event.status !== "draft") return;
    setDeleteModal({
      isOpen: true,
      eventId: event.id,
      eventTitle: event.title,
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false, eventId: null, eventTitle: "" });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(deleteModal.eventId);
      alert("Draft event deleted successfully");
      setEventsData((prevEvents) =>
        prevEvents.filter((ev) => ev.id !== deleteModal.eventId),
      );
      handleCloseDeleteModal();
    } catch (error) {
      alert("Error: Cannot delete the event. Please try again!");
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (meta && currentPage < meta.last_page) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className={styles.tableContainer}>
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
        {isAllEventsPage && (
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              style={{ width: "200px" }}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={categoriesLoading}
            >
              <option value="">Filter by Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

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
                  const capacity = event.capacity || 0;
                  const confirmed = event.registrations_count ?? 0;
                  const percent =
                    capacity > 0 ? Math.round((confirmed / capacity) * 100) : 0;

                  let barColor = "#22c55e"; // Default Green (< 50%)
                  if (event.status === "ended") barColor = "#d1d5db";
                  else if (percent >= 90) barColor = "#ef4444";
                  else if (percent >= 50) barColor = "#f59e0b";

                  return (
                    <tr key={event.id} className={styles.tableRow}>
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
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
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
                              <span>{percent}%</span>
                              <span>
                                {confirmed}/{capacity > 0 ? capacity : "∞"}
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
                                  backgroundColor: barColor,
                                  borderRadius: "9999px",
                                  width: `${percent}%`,
                                  transition: "width 0.5s ease-in-out",
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {event.status === "draft" ||
                        event.status === "published" ? (
                          <div className={styles.actionGroup}>
                            {event.status === "draft" && (
                              <>
                                <button
                                  className={styles.actionBtn}
                                  title="Edit Event"
                                  onClick={() =>
                                    navigate(
                                      `/organizer/events/${event.id}/edit`,
                                    )
                                  }
                                >
                                  <i
                                    className="fa-solid fa-pen-to-square"
                                    style={{ fontSize: "16px" }}
                                  ></i>
                                </button>
                                <button
                                  className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
                                  title="Delete Event"
                                  onClick={() => handleOpenDeleteModal(event)}
                                >
                                  <i
                                    className="fa-solid fa-trash-can"
                                    style={{ fontSize: "16px" }}
                                  ></i>
                                </button>
                              </>
                            )}
                            {event.status === "published" && (
                              <button
                                onClick={() => handleOpenCancelModal(event)}
                                className="btn btn-sm btn-outline-danger"
                                title="Cancel Event"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            )}
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
                      Try adjusting your search or filter criteria.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <button
              className={styles.secondaryBtn}
              style={{
                padding: "0.375rem 0.75rem",
                fontSize: "0.75rem",
                opacity: meta?.current_page >= meta?.last_page ? 0.5 : 1,
                cursor:
                  meta?.current_page >= meta?.last_page
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={meta?.current_page >= meta?.last_page}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {cancelModal.isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          >
            <h4
              style={{
                margin: "0 0 16px 0",
                color: "#dc3545",
                fontWeight: "bold",
              }}
            >
              Cancel Event
            </h4>
            <p
              style={{
                margin: "0 0 24px 0",
                color: "#4b5563",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to cancel the event{" "}
              <strong>"{cancelModal.eventTitle}"</strong>? This action cannot be
              undone. The event will be marked as Cancelled and attendees will
              be notified.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={handleCloseCancelModal}
                className="btn btn-secondary"
                disabled={isCancelling}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCancel}
                className="btn btn-danger"
                disabled={isCancelling}
                style={{ minWidth: "100px" }}
              >
                {isCancelling ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModal.isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          >
            <h4
              style={{
                margin: "0 0 16px 0",
                color: "#dc3545",
                fontWeight: "bold",
              }}
            >
              Delete Draft Event
            </h4>
            <p
              style={{
                margin: "0 0 24px 0",
                color: "#4b5563",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to delete the draft event{" "}
              <strong>"{deleteModal.eventTitle}"</strong>? This action cannot be
              undone and the event data will be permanently removed.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={handleCloseDeleteModal}
                className="btn btn-secondary"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="btn btn-danger"
                disabled={isDeleting}
                style={{ minWidth: "100px" }}
              >
                {isDeleting ? "Processing..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
