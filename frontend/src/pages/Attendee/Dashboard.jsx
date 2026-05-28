import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer/Footer";

import HeroSection from "../Public/components/HeroSection/HeroSection";
import { useState } from "react";
import FeaturedEvents from "../Public/components/FeaturedEvents/FeaturedEvents";
import CategorySection from "../Public/components/CategorySection/CategorySection";

export default function AttendeeDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <NavBar />

      <main>
        <HeroSection />
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <FeaturedEvents selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
}
