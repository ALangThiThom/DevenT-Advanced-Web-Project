import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"; // Đảm bảo bạn import file CSS này

const SearchBar = ({ placeholder }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?query=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    // Thêm class wrapper để dễ quản lý layout responsive
    <div className="search-bar-wrapper">
      <form onSubmit={handleSearch} className="search-bar">
        <input 
          type="text" 
          placeholder={placeholder} 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;