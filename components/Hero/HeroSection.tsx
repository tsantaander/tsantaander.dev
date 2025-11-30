"use client"
import { useRef } from "react"
import { useTheme } from "next-themes"
import { useInView } from "motion/react"
import ReadingSection from "./ReadingSection"
import Beams from "@/components/ui/beams";

export default function HeroSection() {
  const { resolvedTheme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: "100px" })
  
  return (
    <section ref={sectionRef} id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        {isInView && (
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#008DFF"
            backgroundColor={resolvedTheme === 'dark' ? '#000000' : '#000b35'}
            speed={3}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        )}
      </div>
      <div className="container mx-auto z-20 text-white py-12 max-lg:mt-20">
        <ReadingSection />
      </div>
    </section>
  )
}
