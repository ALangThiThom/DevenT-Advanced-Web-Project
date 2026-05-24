import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSearch} className="search-bar">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchBar;