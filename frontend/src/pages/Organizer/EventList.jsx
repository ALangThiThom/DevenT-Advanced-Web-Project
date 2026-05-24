import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizerEvents, cancelEvent, deleteEvent } from "../../services/eventService";
import styles from "./styles/Organizer.module.css";

/**
 * Component EventList
 * Hiển thị bảng danh sách sự kiện của Ban tổ chức theo các tab (Draft, Published, Cancelled, Ended)
 */
export default function EventList() {
  // ========================================================================
  // 1. ROUTER & CUSTOM HOOKS
  // ========================================================================
  const location = useLocation();
  const navigate = useNavigate();

  // ========================================================================
  // 2. STATE MANAGEMENT (Quản lý trạng thái)
  // ========================================================================
  // State quản lý danh sách và trạng thái tải dữ liệu
  const [eventsData, setEventsData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  // State quản lý Modal Hủy Sự Kiện
  const [cancelModal, setCancelModal] = useState({ isOpen: false, eventId: null, eventTitle: '' });
  const [isCancelling, setIsCancelling] = useState(false);

  // State quản lý Modal Xóa Sự Kiện Nháp
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: null, eventTitle: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  // ========================================================================
  // 3. DERIVED STATE & CONSTANTS (Biến phái sinh)
  // ========================================================================
  // Lấy trạng thái từ URL (VD: ?status=published)
  const statusParam = new URLSearchParams(location.search).get("status") || "draft";
  const validStatuses = ["draft", "published", "cancelled", "ended"];
  const currentStatus = validStatuses.includes(statusParam) ? statusParam : "draft";

  // Xác định tiêu đề hiển thị trên bảng
  const pageTitle =
    currentStatus === "draft" ? "Draft Events"
      : currentStatus === "published" ? "Published Events"
      : currentStatus === "cancelled" ? "Cancelled Events"
      : "Ended Events";

  // ========================================================================
  // 4. LIFECYCLE & DATA FETCHING (Vòng đời & Gọi API)
  // ========================================================================
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  /**
   * Gọi API lấy danh sách sự kiện dựa trên trạng thái hiện tại
   */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getOrganizerEvents({ page: 1, status: currentStatus });
      setEventsData(data.events);
      setMeta(data.meta);
    } catch (error) {
      console.error("Unable to load event list", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================================================
  // 5. EVENT HANDLERS (Hàm xử lý tương tác UI)
  // ========================================================================
  /**
   * Mở Modal xác nhận hủy sự kiện
   * @param {Object} event - Đối tượng sự kiện được chọn
   */
  const handleOpenCancelModal = (event) => {
    if (event.status !== 'published') return;
    setCancelModal({ isOpen: true, eventId: event.id, eventTitle: event.title });
  };

  /**
   * Đóng Modal và xóa dữ liệu tạm
   */
  const handleCloseCancelModal = () => {
    setCancelModal({ isOpen: false, eventId: null, eventTitle: '' });
  };

  /**
   * Gọi API thực thi việc Hủy sự kiện khi user bấm Confirm
   */
  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    try {
      await cancelEvent(cancelModal.eventId);
      
      alert("Event cancelled successfully");
      
      // FIX LỖI TÊN BIẾN: Cập nhật status của sự kiện trong mảng eventsData
      setEventsData(prevEvents => prevEvents.map(ev => 
        ev.id === cancelModal.eventId ? { ...ev, status: 'cancelled' } : ev
      ));
      
      handleCloseCancelModal();
    } catch (error) {
      alert("Error: Cannot cancel the event. Please try again!");
    } finally {
      setIsCancelling(false);
    }
  };

  /**
   * Mở Modal xác nhận xóa bản nháp sự kiện
   * @param {Object} event - Đối tượng sự kiện được chọn
   */
  const handleOpenDeleteModal = (event) => {
    if (event.status !== 'draft') return;
    setDeleteModal({ isOpen: true, eventId: event.id, eventTitle: event.title });
  };

  /**
   * Đóng Modal xóa sự kiện
   */
  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
  };

  /**
   * Gọi API thực thi việc Xóa sự kiện nháp khi user bấm Confirm
   */
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEvent(deleteModal.eventId);
      
      alert("Draft event deleted successfully");
      
      // Xóa sự kiện khỏi mảng eventsData
      setEventsData(prevEvents => prevEvents.filter(ev => ev.id !== deleteModal.eventId));
      
      handleCloseDeleteModal();
    } catch (error) {
      alert("Error: Cannot delete the event. Please try again!");
    } finally {
      setIsDeleting(false);
    }
  };

  // ========================================================================
  // 6. UTILITY FUNCTIONS (Hàm tiện ích hỗ trợ định dạng)
  // ========================================================================
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const calculateProgress = (registrations, capacity) => {
    if (!capacity) return 0;
    const percent = Math.round((registrations / capacity) * 100);
    return percent > 100 ? 100 : percent;
  };

  const getProgressColor = (status) => {
    if (status === "published") return "#22c55e"; // green-500
    if (status === "cancelled") return "#ef4444"; // red-500
    return "#9ca3af"; // gray-400 (draft)
  };

  // ========================================================================
  // 7. RENDER (Vẽ Giao diện)
  // ========================================================================
  return (
    <div className={styles.tableContainer}>
      {/* HEADER BẢNG */}
      <div className={styles.tableHeader}>
        <h2 style={{ fontSize: "1rem", fontWeight: "bold", margin: 0, color: "var(--on-surface)" }}>
          {pageTitle}
        </h2>
        <button className={styles.secondaryBtn}>
          <i className="fa-solid fa-filter" style={{ fontSize: "14px" }}></i> Filter
        </button>
      </div>

      {/* NỘI DUNG BẢNG */}
      {loading ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--on-surface-variant)" }}>
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
                  const registered = event.registrations_count || 0;
                  const progressPercent = calculateProgress(registered, capacity);

                  return (
                    <tr key={event.id} className={styles.tableRow}>
                      {/* Cột Tên sự kiện */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "4px", backgroundColor: "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <i className="fa-regular fa-image" style={{ color: "#9CA3AF" }}></i>
                          </div>
                          <span style={{ fontWeight: "500", fontSize: "0.875rem", color: "var(--on-surface)" }}>
                            {event.title}
                          </span>
                        </div>
                      </td>

                      {/* Cột Ngày tháng */}
                      <td style={{ color: "var(--on-surface-variant)" }}>{formatDate(event.start_time)}</td>

                      {/* Cột Danh mục */}
                      <td style={{ color: "var(--on-surface-variant)" }}>{event.category?.name || "Uncategorized"}</td>

                      {/* Cột Trạng thái */}
                      <td>
                        <span className={ event.status === "published" ? styles.badgePublished : event.status === "cancelled" ? styles.badgeCancelled : styles.badgeDraft }>
                          {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : "Draft"}
                        </span>
                      </td>

                      {/* Cột Thanh Tiến Độ */}
                      <td>
                        {event.status === "draft" ? (
                          <span style={{ fontSize: "0.75rem", color: "var(--on-surface-variant)", fontStyle: "italic" }}>
                            Not started
                          </span>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", width: "128px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--on-surface-variant)", fontWeight: "500" }}>
                              <span>{progressPercent}%</span>
                              <span>{registered}/{capacity}</span>
                            </div>
                            <div style={{ height: "6px", width: "100%", backgroundColor: "#F3F4F6", borderRadius: "9999px" }}>
                              <div style={{ height: "100%", backgroundColor: getProgressColor(event.status), borderRadius: "9999px", width: `${progressPercent}%` }}></div>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* FIX LOGIC: Cột Actions hiển thị động theo trạng thái */}
                      <td style={{ textAlign: "right" }}>
                        {event.status === "draft" || event.status === "published" ? (
                          <div className={styles.actionGroup}>
                            
                            {/* Draft Actions: Edit & Delete */}
                            {event.status === "draft" && (
                              <>
                                <button className={styles.actionBtn} title="Edit Event" onClick={() => navigate(`/organizer/events/${event.id}/edit`)}>
                                  <i className="fa-solid fa-pen-to-square" style={{ fontSize: "16px" }}></i>
                                </button>
                                <button className={`${styles.actionBtn} ${styles.actionBtnDelete}`} title="Delete Event" onClick={() => handleOpenDeleteModal(event)}>
                                  <i className="fa-solid fa-trash-can" style={{ fontSize: "16px" }}></i>
                                </button>
                              </>
                            )}

                            {/* Published Actions: Cancel */}
                            {event.status === "published" && (
                              <button onClick={() => handleOpenCancelModal(event)} className="btn btn-sm btn-outline-danger" title="Cancel Event">
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            )}

                          </div>
                        ) : (
                          <span style={{ color: "var(--on-surface-variant)", fontSize: "0.85rem" }}>
                            No actions
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="6" style={{ padding: "4rem 2rem", textAlign: "center" }}>
                    <div style={{ color: "var(--on-surface-variant)", marginBottom: "1rem" }}>
                      <i className="fa-regular fa-folder-open fa-3x"></i>
                    </div>
                    <h4 style={{ fontWeight: "600", marginBottom: "0.5rem", color: "var(--on-surface)" }}>No events found</h4>
                    <p style={{ fontSize: "0.875rem", color: "var(--on-surface-variant)" }}>
                      You haven't created any events yet. Click "Create New Event" to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* FOOTER PHÂN TRANG */}
      {!loading && eventsData?.length > 0 && (
        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--border-main)", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F9FAFB" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "var(--on-surface-variant)" }}>
            Showing {meta?.from || 0} to {meta?.to || 0} of {meta?.total || 0} events
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className={styles.secondaryBtn} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem", opacity: 0.5, cursor: "not-allowed" }} disabled>Previous</button>
            <button className={styles.secondaryBtn} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}>Next</button>
          </div>
        </div>
      )}

      {/* ======================================================================== */}
      {/* 8. MODAL PORTALS (Hộp thoại nổi)                                        */}
      {/* Đặt ở cuối cùng để không làm rối cấu trúc HTML chính                     */}
      {/* ======================================================================== */}
      {cancelModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', width: '400px', maxWidth: '90%', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#dc3545', fontWeight: 'bold' }}>Cancel Event</h4>
            <p style={{ margin: '0 0 24px 0', color: '#4b5563', lineHeight: '1.5' }}>
              Are you sure you want to cancel the event <strong>"{cancelModal.eventTitle}"</strong>? This action cannot be undone. The event will be marked as Cancelled and attendees will be notified.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={handleCloseCancelModal} className="btn btn-secondary" disabled={isCancelling}>Cancel</button>
              <button onClick={handleConfirmCancel} className="btn btn-danger" disabled={isCancelling} style={{ minWidth: '100px' }}>
                {isCancelling ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Draft Event Modal */}
      {deleteModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', width: '400px', maxWidth: '90%', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#dc3545', fontWeight: 'bold' }}>Delete Draft Event</h4>
            <p style={{ margin: '0 0 24px 0', color: '#4b5563', lineHeight: '1.5' }}>
              Are you sure you want to delete the draft event <strong>"{deleteModal.eventTitle}"</strong>? This action cannot be undone and the event data will be permanently removed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={handleCloseDeleteModal} className="btn btn-secondary" disabled={isDeleting}>Cancel</button>
              <button onClick={handleConfirmDelete} className="btn btn-danger" disabled={isDeleting} style={{ minWidth: '100px' }}>
                {isDeleting ? 'Processing...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}