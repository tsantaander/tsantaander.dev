"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Home, User, Briefcase, FileText, BookOpen } from 'lucide-react'
import { scrollToTarget } from "@/components/ui/scrollAnimation"
import dynamic from "next/dynamic"

const AnimatedThemeToggler = dynamic(() => import('@/components/ui/animated-theme-toggler'), { ssr: false })

const navItems = [
  { name: 'Home', url: '/', icon: Home, style: "animate-pulse-fade-in animate-delay-500 animate-duration-100", isRoute: true },
  { name: 'Acerca de mi', url: 'aboutme', icon: User, style: "animate-pulse-fade-in animate-delay-700 animate-duration-100" },
  { name: 'Proyectos', url: 'projects', icon: Briefcase, style: "animate-pulse-fade-in animate-delay-800 animate-duration-100" },
  { name: 'Blog', url: '/blog', icon: BookOpen, style: "animate-pulse-fade-in animate-delay-900 animate-duration-100", isExternal: true },
  { name: 'Contacto', url: 'contact', icon: FileText, style: "animate-pulse-fade-in animate-delay-1000 animate-duration-100" }
]
type NavBarProps = {
  items?: {
    name: string
    url: string
    style: string
    icon: LucideIcon
    isExternal?: boolean
    isRoute?: boolean
  }[]
}

export default function NavBar({ items = navItems }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const isClicking = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    // Si estamos en una página externa (como /blog), determinamos el tab activo por la URL
    const currentItem = items.find(item =>
      item.isExternal ? pathname === item.url : pathname === '/' && item.url === '/'
    )
    if (currentItem) {
      setActiveTab(currentItem.name)
    } else if (pathname === '/') {
      // Para la página de inicio, usamos Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          if (isClicking.current) {
            return;
          }
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const navItem = items.find((item) => item.url === entry.target.id);
              if (navItem) {
                setActiveTab(navItem.name);
              }
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px 0px -50px 0px',
        }
      );

      const sections = items
        .filter(item => !item.isExternal && !item.isRoute)
        .map(item => document.getElementById(item.url))
        .filter((section): section is HTMLElement => section !== null);

      sections.forEach(section => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [pathname, items])

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
      <div className="flex items-center gap-3 bg-white/65 dark:bg-white/35 border backdrop-blur-md py-1 px-1 rounded-full shadow-lg animate-fade-in-down animate-duration-600">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.isExternal || item.isRoute ? item.url : `#${item.url}`}
              onClick={(e) => {
                if (!item.isExternal && !item.isRoute) {
                  // Solo para secciones de scroll internas
                  e.preventDefault();
                  isClicking.current = true;
                  setActiveTab(item.name);
                  scrollToTarget(item.url);
                  // Después de 1 segundo, permitimos que el observador vuelva a tomar el control.
                  setTimeout(() => {
                    isClicking.current = false;
                  }, 1000);
                } else {
                  // Para rutas y enlaces externos, solo actualizamos el estado activo
                  setActiveTab(item.name);
                }
              }}
              className={cn(
                `relative cursor-pointer text-base font-fira font-semibold px-6 py-2 rounded-full transition-colors whitespace-nowrap ${item.style}`,
                "text-foreground/80 hover:text-primary",
                isActive && "bg-slate-200 dark:bg-slate-900 text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={15} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
        <div className="flex w-[64px] items-center justify-center pl-6 pr-2">
          <AnimatedThemeToggler />
        </div>
      </div>
    </div>
  )
}
