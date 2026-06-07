import  { useState } from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import FeaturedEvents from "./components/FeaturedEvents/FeaturedEvents";
import CategorySection from "./components/CategorySection/CategorySection";
import OrganizerCTA from "./components/OrganizerCTA/OrganizerCTA";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <HeroSection />
      <CategorySection 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      <FeaturedEvents selectedCategory={selectedCategory} />

      <OrganizerCTA />
    </>
  );
}