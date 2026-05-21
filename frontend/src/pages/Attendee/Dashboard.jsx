import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer/Footer";

import HeroSection from "../Public/components/HeroSection/HeroSection";
import FeaturedEvents from "../Public/components/FeaturedEvents/FeaturedEvents";
import CategorySection from "../Public/components/CategorySection/CategorySection";

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
