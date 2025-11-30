"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Inicializar Lenis
    lenisRef.current = new Lenis({
      duration: 1.4, // Duración de la animación de scroll (más lento)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave exponencial
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reducido para scroll más lento
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Función de animación
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
