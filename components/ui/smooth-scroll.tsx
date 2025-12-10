"use client"

import { useEffect, useRef } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

/**
 * Component that enables native smooth scrolling with performance optimizations
 * Uses browser's native scroll-behavior: smooth for traditional scrolling
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Enable will-change dynamically during scroll for better performance
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      document.documentElement.style.willChange = 'scroll-position'
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.documentElement.style.willChange = 'auto'
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return <>{children}</>
}
