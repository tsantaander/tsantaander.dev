import Image from "next/image"
import ReadingSection from "./ReadingSection"

export default function HeroSection() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden flex items-center">
      <div className="container mx-auto z-20 text-white py-12 max-lg:mt-20">
        <ReadingSection />
      </div>
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/hero_background.webp"
          alt="Imagen personal Tomás Santander"
          fill
          sizes="100vw"
          priority
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </section>
  )
}
