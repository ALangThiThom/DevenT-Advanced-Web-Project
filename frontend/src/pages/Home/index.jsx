import Navbar from "../../components/layout/navbar/NavBar";
import Footer from "../../components/layout/Footer/Footer";
import HeroSection from "../../components/heroSection/HeroSection";
import FeaturedEvents from "../../components/featuredEvents/FeaturedEvents";
import OrganizerCTA from "../../components/organizerCTA/OrganizerCTA";
import CategorySection from "../../components/categorySection/CategorySection";

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
