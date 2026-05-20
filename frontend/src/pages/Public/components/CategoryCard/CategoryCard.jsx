

const CategoryCard = ({ category }) => {

  const name = typeof category === "string" ? category : category.name;

  return (
    <button className="category-item">

      <div className="category-item__icon-wrapper">
        <span style={{ fontSize: "24px" }}>✨</span>
      </div>


      <p className="category-item__name">{name}</p>
    </button>
  );
};

export default CategoryCard;