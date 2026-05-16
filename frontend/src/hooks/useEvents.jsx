import { useState } from "react";

const MOCK_EVENTS = [
  {
    id: 1,
    name: "Đêm nhạc Neon Nights",
    date_time: "24 Th10 • 19:00", 
    location: "Sân vận động Skyline",
    category: "Âm nhạc",
    status: "Còn 48 / 150 chỗ", 
    description: "Hành trình âm thanh hình ảnh đắm chìm với các nghệ sĩ điện tử quốc tế.",
    
  },
  {
    id: 2,
    name: "Hội nghị Công nghệ Tương lai",
    date_time: "02 Th11 • 09:00",
    location: "Trung tâm Hội nghị Quốc gia",
    category: "Giáo dục",
    status: "Còn 5 / 60 chỗ",
    description: "Khám phá thập kỷ đổi mới tiếp theo cùng các nhà lãnh đạo ngành.",

  },
  {
    id: 3,
    name: "Xưởng làm Pasta Thủ công",
    date_time: "15 Th11 • 18:30",
    location: "Phòng bếp The Kitchen Lab",
    category: "Ẩm thực",
    status: "Còn 20 / 30 chỗ", 
    description: "Học bí quyết làm pasta truyền thống từ các đầu bếp nổi tiếng địa phương.",

  },
];

const useEvents = () => {
  const [events] = useState(MOCK_EVENTS);
  return { events, loading: false };
};

export default useEvents;