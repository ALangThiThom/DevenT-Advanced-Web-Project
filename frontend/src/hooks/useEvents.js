import { useState, useEffect } from "react";
import axios from "axios";

// 1. CHỈ SỬA CHỖ NÀY: Thêm tham số categoryId vào trong ngoặc (mặc định để chuỗi rỗng '')
const useEvents = (categoryId = '') => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bạn tìm đến hàm đang gọi API dùng axios.get của nhóm bạn
  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // 2. CHỈ SỬA CHỖ NÀY: Kẹp thêm params chứa category_id vào cấu hình của axios.get
      const response = await axios.get("http://localhost:8000/api/events", {
        params: { category_id: categoryId } // Gửi ID danh mục sang cho hàm index() ở Backend Laravel xử lý
      });

      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. CHỈ SỬA CHỖ NÀY: Bỏ biến categoryId vào mảng phụ thuộc [categoryId] của useEffect
  // Mỗi lần bạn bấm nút tròn khác, categoryId thay đổi -> useEffect sẽ tự kích hoạt chạy lại hàm fetchEvents()
  useEffect(() => {
  const loadData = async () => {
    await fetchEvents();
  };
  
  loadData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [categoryId]);

  return { events, loading };
};

export default useEvents;
