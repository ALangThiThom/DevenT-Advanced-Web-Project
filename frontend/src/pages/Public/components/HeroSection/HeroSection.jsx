import SearchBar from "../Search/Search";
import "./HeroSection.css";

const HeroSection = () => (
  <section className="hero">
    <div className="hero__content">
      <div className="hero__text">
        <h3>Find your next experience.</h3>
        <p>Discover local concerts, workshops and meetups</p>
      </div>
      <SearchBar placeholder="Search events, locations..." />

    </div>
  </section>
);

export default HeroSection;