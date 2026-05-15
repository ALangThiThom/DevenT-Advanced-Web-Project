const CategoryCard = ({ category }) => {
  const { name, icon } = category;
  return (
    <div className="category-card">
      <div className="category-card__icon">{icon}</div>
      <p>{name}</p>
    </div>
  );
};
export default CategoryCard;