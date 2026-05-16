import { useState } from "react";

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Đêm nhạc Neon Nights",
    date: "20 Th11, 10:00",
    location: "Sân vận động Quốc gia",
    category: "Âm nhạc",
    image: "https://via.placeholder.com/300x200",
    price: "200.000đ",
    status: "Còn vé",
  },
  {
    id: 2,
    title: "Hội nghị Công nghệ Tương lai",
    date: "22 Th11, 09:00",
    location: "Trung tâm Hội nghị Quốc tế",
    category: "Công nghệ",
    image: "https://via.placeholder.com/300x200",
    price: "Free",
    status: "Miễn phí",
  },
  {
    id: 3,
    title: "Workshop Làm Pasta",
    date: "25 Th11, 14:00",
    location: "The Pep Kitchen",
    category: "Ẩm thực",
    image: "https://via.placeholder.com/300x200",
    price: "350.000đ",
    status: "Hết vé",
  },
];

const useEvents = () => {
  const [events] = useState(MOCK_EVENTS);
  return { events, loading: false };
};

export default useEvents;