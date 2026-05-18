import Navbar from "../../components/layout/navbar/NavBar";
import Footer from "../../components/layout/footer/Footer";
import HeroSection from "../../components/heroSection/HeroSection";
import FeaturedEvents from "../../components/featuredEvents/FeaturedEvents";
import CategorySection from "../../components/categorySection/CategorySection";

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
