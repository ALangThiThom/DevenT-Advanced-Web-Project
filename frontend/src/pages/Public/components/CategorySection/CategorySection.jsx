import CategoryCard from "../CategoryCard/CategoryCard";
import useCategories from "../../../../hooks/useCategories";
import "./CategorySection.css";
const CategorySection = ({ selectedCategory, onSelectCategory }) => {
  const { categories } = useCategories();

  return (
    <section className="category-section">
      <div className="category-section__header">
        <h2>Explore by Category</h2>
        <a href="#" className="category-section__view-all">
          View all categories →
        </a>
      </div>
      <div className="category-section__list">
        <button
          onClick={() => onSelectCategory('')} 
          className={`category-item ${selectedCategory === '' ? 'active' : ''}`}
          style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
        >
          <div className="category-item__icon-wrapper">
            🌟
          </div>
          <p className="category-item__name">All Categories</p>
        </button>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              isActive={selectedCategory === cat.id} 
              onClick={() => onSelectCategory(cat.id)} 
            />
          ))
        ) : (
          <p className="text-muted w-100 text-center">No categories available.</p>
        )}
      </div>
    </section>
  );
};

export default CategorySection;