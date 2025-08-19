"use client"
import ReadingSection from "./ReadingSection"
import Beams from "@/components/ui/beams";

export default function HeroSection() {
  return (
    <section id="home" className="relative h-[100vh] w-full overflow-hidden flex items-center">
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#008DFF"
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="container mx-auto z-20 text-white py-12 max-lg:mt-20">
        <ReadingSection />
      </div>
    </section>
  )
}
