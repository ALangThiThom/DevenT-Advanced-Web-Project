import CategoryCard from "../categoryCard/CategoryCard";
import useCategories from "../../hooks/useCategories";
import "./categorySection.css"; 

const CategorySection = () => {
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
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;