import NavBar from "@/components/Header/Navbar";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturedCardSection from "@/components/FeatureSection/FeaturedCardSection";

export default function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <HeroSection />
        <div className="hidden lg:block">
          <FeaturedCardSection />
        </div>
      </main>
    </>
  );
};
