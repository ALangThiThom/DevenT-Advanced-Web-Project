import HeroSection from "./components/HeroSection/HeroSection";
import FeaturedEvents from "./components/FeaturedEvents/FeaturedEvents";
import CategorySection from "./components/CategorySection/CategorySection";
import OrganizerCTA from "./components/OrganizerCTA/OrganizerCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedEvents />
      <OrganizerCTA />
    </>
  );
}