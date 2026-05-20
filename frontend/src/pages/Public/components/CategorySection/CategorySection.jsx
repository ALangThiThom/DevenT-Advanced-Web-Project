import CategoryCard from "../CategoryCard/CategoryCard";
import useCategories from "../../../../hooks/useCategories";
import "./CategorySection.css";

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
        {categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))
        ) : (
          <p className="text-muted w-100 text-center">No categories available.</p>
        )}
      </div>
    </section>
  );
};

export default CategorySection;