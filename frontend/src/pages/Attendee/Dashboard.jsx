import HeroSection from "../Public/components/HeroSection/HeroSection";
import { useState } from "react";
import FeaturedEvents from "../Public/components/FeaturedEvents/FeaturedEvents";
import CategorySection from "../Public/components/CategorySection/CategorySection";

export default function AttendeeDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <HeroSection />
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <FeaturedEvents selectedCategory={selectedCategory} />
    </>
  );
}
