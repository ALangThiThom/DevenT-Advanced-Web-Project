import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/home/HeroSection";
import FeaturedEvents from "../../components/home/FeaturedEvents";
import CategorySection from "../../components/home/CategorySection";

export default function AttendeeDashboard() {
  return (
    <div>
      <Navbar />

      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedEvents />
      </main>
      <Footer />
    </div>
  );
}
