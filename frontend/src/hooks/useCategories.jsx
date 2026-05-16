import { useState } from "react";

const MOCK_CATEGORIES = [
  { 
    id: 1, 
    name: "Âm nhạc", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    ) 
  },
  { 
    id: 2, 
    name: "Thể thao", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 2-2.5 6.5H4l5 4-2 6.5 5-4 5 4-2-6.5 5-4h-5.5Z"/></svg>
    ) 
  },
  { 
    id: 3, 
    name: "Ẩm thực", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v4"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v6"/><path d="M12 18H3"/></svg>
    ) 
  },
  { 
    id: 4, 
    name: "Nghệ thuật", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19c0 .001 0 .001 0 0 .5.5 1 1 1.5 1.5M12 22c-1.18 0-2.06-.58-2.46-1.54-.15-.36-.02-.78.3-.98.7-.45 1.16-1.23 1.16-2.12a2.3 2.3 0 0 0-2.3-2.3c-.89 0-1.67.46-2.12 1.16-.2.32-.62.45-.98.3C4.58 16.06 4 15.18 4 14c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="11.5" cy="7.5" r="1"/><circle cx="16.5" cy="9.5" r="1"/><circle cx="15.5" cy="14.5" r="1"/></svg>
    ) 
  },
  { 
    id: 5, 
    name: "Giáo dục", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L2 13"/><path d="M21.42 10.922c0 .023-.007.044-.019.066L12.83 14.9a2 2 0 0 0-1.66 0L7 12.8v3.7a2 2 0 0 0 1.18 1.82l3 1.32a2 2 0 0 0 1.64 0l3-1.32A2 2 0 0 0 17 16.5v-3.7z"/></svg>
    ) 
  },
  { 
    id: 6, 
    name: "Cộng đồng", 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ) 
  },
];

const useCategories = () => {
  const [categories] = useState(MOCK_CATEGORIES); 
  return { categories, loading: false };
};

export default useCategories;