import { useState, useEffect } from "react"; // Đã thêm useEffect ở đây
import axios from "axios";                   // Đã thêm import axios ở đây

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories")
      .then(res => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch(err => {
        console.error("Lỗi khi lấy danh mục từ Backend:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categories, loading };
};

export default useCategories;