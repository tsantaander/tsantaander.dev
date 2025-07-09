import Image from "next/image"
import ReadingSection from "./ReadingSection"

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[100vh] w-full overflow-hidden flex items-center">
      <div className="container mx-auto z-20 text-white py-12 max-lg:mt-20">
        <ReadingSection />
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover object-center mask-b-from-99% dark:mask-b-from-90%"
          src="/backgrounds/hero_background.webp"
          alt="Imagen personal Tomás Santander"
          fill
          sizes="100vw"
          priority
          quality={90}
        />
      </div>
    </section>
  )
}
