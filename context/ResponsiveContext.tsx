'use client'
import React, { createContext, useContext, useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

type ResponsiveContextType = {
  isMobile: boolean
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined)

export const ResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    checkMobile()

    mql.addEventListener("change", checkMobile)
    window.addEventListener("resize", checkMobile)

    return () => {
      mql.removeEventListener("change", checkMobile)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  )
}

// Hook para usarlo en cualquier componente
export const useResponsive = () => {
  const context = useContext(ResponsiveContext)
  if (context === undefined) {
    throw new Error("useResponsive debe usarse dentro de ResponsiveProvider")
  }
  return context
}
