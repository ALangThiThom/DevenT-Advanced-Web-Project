import NavBar from "../../components/layout/navbar/NavBar";
import Footer from "../../components/layout/Footer/Footer";

import HeroSection from "../Public/components/heroSection/HeroSection";
import FeaturedEvents from "../Public/components/featuredEvents/FeaturedEvents";
import CategorySection from "../Public/components/categorySection/CategorySection";

export default function AttendeeDashboard() {
  return (
    <div>
      <NavBar />

      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedEvents />
      </main>
      <Footer />
    </div>
  );
}
