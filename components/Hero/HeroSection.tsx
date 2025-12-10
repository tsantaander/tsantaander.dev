"use client"
import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useInView } from "motion/react"
import ReadingSection from "./ReadingSection"
import Beams from "@/components/ui/beams";

export default function HeroSection() {
  const { resolvedTheme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const hasBeenInViewRef = useRef(false)
  
  // Use InView WITHOUT once: true to allow re-animation
  const isInView = useInView(sectionRef, { margin: "100px", once: false })
  
  // Re-trigger animation only when RE-ENTERING viewport (not on first entry)
  useEffect(() => {
    if (isInView) {
      if (hasBeenInViewRef.current) {
        // Only increment on subsequent entries, not the first one
        setAnimationKey(prev => prev + 1)
      } else {
        // Mark as having been in view
        hasBeenInViewRef.current = true
      }
    }
  }, [isInView])
  
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
      <div key={animationKey} className="container mx-auto z-20 text-white py-12 max-lg:mt-20">
        <ReadingSection />
      </div>
    </section>
  )
}
