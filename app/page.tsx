import NavBar from "@/components/Header/NavBar";
import HeroSection from "@/components/Hero/HeroSection";
import AboutMe from "@/components/AboutSection/AboutMe";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <section id="aboutme">
          <HeroHighlight className="w-full flex flex-col mx-auto py-12 items-center justify-center min-h-screen">
            <AboutMe />
          </HeroHighlight>
        </section>
      </main>
    </>
  );
};
