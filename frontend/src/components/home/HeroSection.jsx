import SearchBar from "../common/Search";
import "../../pages/styles/heroSection.css";

const HeroSection = () => (
  <section className="hero">
    <div className="hero__content">
      <div className="hero__text">
        <h3>Tìm kiếm trải nghiệm tiếp theo của bạn.</h3>
        <p>Khám phá các buổi hòa nhạc, hội thảo và gặp gỡ địa phương</p>
      </div>
      <SearchBar placeholder="Tìm kiếm, địa điểm, sự kiện..." />
      
    </div>
  </section>
);

export default HeroSection;