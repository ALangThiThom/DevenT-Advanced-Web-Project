

const CategoryCard = ({ category }) => {
  // Nếu dữ liệu là chuỗi trực tiếp (ví dụ: "Âm nhạc") thì lấy luôn, nếu là Object thì lấy .name
  const name = typeof category === "string" ? category : category.name;

  return (
    <button className="category-item">
      {/* Vòng tròn xám chứa icon cố định hoặc ký tự mặc định tùy bạn */}
      <div className="category-item__icon-wrapper">
        <span style={{ fontSize: "24px" }}>✨</span>
      </div>
      
      {/* Hiện tên chữ danh mục từ database lên đây */}
      <p className="category-item__name">{name}</p>
    </button>
  );
};

export default CategoryCard;