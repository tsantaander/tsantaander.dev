"use client"

import { MotionConfig } from "motion/react"

interface MotionProviderProps {
  children: React.ReactNode
}

/**
 * Global Motion configuration following animate-ui official recommendations
 * @see https://animate-ui.com/docs/accessibility
 * 
 * With reducedMotion="user", Motion will automatically:
 * - Disable transform and layout animations if the user has Reduced Motion enabled
 * - Keep helpful transitions like opacity or background-color
 */
export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
