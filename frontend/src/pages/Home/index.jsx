
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/home/HeroSection";
import FeaturedEvents from "../../components/home/FeaturedEvents";
import OrganizerCTA from "../../components/home/OrganizerCTA";
import CategorySection from "../../components/home/CategorySection";


export default function Homepage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection />
        <FeaturedEvents />
        <OrganizerCTA />
      </main>
      <Footer />
    </div>
  );
}