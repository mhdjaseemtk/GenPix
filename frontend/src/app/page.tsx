import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";


export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-black">
      {/* <Navbar/> */}
      <HeroSection />
      <FeaturesSection />
    </main>
  );
} 
