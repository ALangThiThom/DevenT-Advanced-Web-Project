import api from "../utils/api";

/**
 * Gọi API lấy dữ liệu tổng hợp cho trang Dashboard (Thống kê và 4 sự kiện mới nhất)
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/organizer/dashboard-stats");
    // Trả về dữ liệu sạch bọc trong key 'data' của Laravel Response
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi fetch thông số dashboard:", error);
    throw error;
  }
};

/**
 * Gọi API lấy toàn bộ danh sách sự kiện phân trang (Trang My Events)
 */
export const getOrganizerEvents = async (page = 1) => {
  try {
    const response = await api.get(`/organizer/events?page=${page}`);
    // Đcore FIX: Trả về object chứa mảng dữ liệu phân trang cho component sử dụng
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi fetch danh sách sự kiện:", error);
    throw error;
  }
};

export const getOrganizerEventById = async (id) => {
  try {
    const response = await api.get(`/organizer/events/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Lỗi khi fetch chi tiết event ${id}:`, error);
    throw error;
  }
};

export const getPublicEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Lỗi khi fetch public event ${id}:`, error);
    throw error;
  }
};
