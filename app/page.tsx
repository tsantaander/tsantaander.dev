import NavBar from "@/components/Header/NavBar";
import HeroSection from "@/components/Hero/HeroSection";
import AboutMe from "@/components/AboutSection/AboutMe";
import ProjectsSection from "@/components/ProjectsSection/ProjectsComponent";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutMe />
        <ProjectsSection />
      </main>
    </>
  );
}
