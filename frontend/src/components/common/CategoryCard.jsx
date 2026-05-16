const CategoryCard = ({ category }) => {
  const { name, icon } = category;
  return (
    <div className="category-item">
      <div className="category-item__icon-wrapper">
        {icon}
      </div>
      <p className="category-item__name">{name}</p>
    </div>
  );
};

export default CategoryCard;