import NavBar from "@/components/Header/NavBar";
import HeroSection from "@/components/Hero/HeroSection";
import AboutMe from "@/components/AboutSection/AboutMe";
import ProjectsSection from "@/components/ProjectsSection/ProjectsComponent";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/FooterSection/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutMe />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
