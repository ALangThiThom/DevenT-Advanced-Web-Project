import { useState } from "react";

const MOCK_CATEGORIES = [
  { id: 1, name: "Âm nhạc", icon: "🎵" },
  { id: 2, name: "Thể thao", icon: "⚽" },
  { id: 3, name: "Ẩm thực", icon: "🍜" },
  { id: 4, name: "Nghệ thuật", icon: "🎨" },
  { id: 5, name: "Giáo dục", icon: "📚" },
  { id: 6, name: "Cộng đồng", icon: "🤝" },
];

const useCategories = () => {
  const [categories] = useState(MOCK_CATEGORIES); 
  return { categories, loading: false };
};

export default useCategories;