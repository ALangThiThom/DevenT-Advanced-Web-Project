const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} />
      <button onClick={onSearch}>Tìm kiếm</button>
    </div>
  );
};
export default SearchBar;