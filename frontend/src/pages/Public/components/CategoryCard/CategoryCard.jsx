
const CategoryCard = ({ category, isActive, onClick }) => {

  const name = typeof category === "string" ? category : category.name;

  return (
    <button 
      onClick={onClick} 
      className={`category-item ${isActive ? 'active' : ''}`}
    >
      <div className="category-item__icon-wrapper">
        <span style={{ fontSize: "24px" }}>✨</span>
      </div>

      <p className="category-item__name">{name}</p>
    </button>
  );
};

export default CategoryCard;