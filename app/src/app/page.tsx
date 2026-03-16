import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ImageCarousel />
      <FeaturesSection />
    </main>
  );
}
