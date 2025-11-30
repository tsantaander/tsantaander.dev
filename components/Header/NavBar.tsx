"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Home, User, Briefcase, FileText, BookOpen } from 'lucide-react'
import { scrollToTarget } from "@/components/ui/scrollAnimation"
import dynamic from "next/dynamic"

const AnimatedThemeToggler = dynamic(() => import('@/components/ui/animated-theme-toggler'), { ssr: false })

const navItems = [
  { name: 'Home', url: 'home', icon: Home, style: "animate-pulse-fade-in animate-delay-500 animate-duration-100" },
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
  const router = useRouter()

  useEffect(() => {
    // Si estamos en una página externa (como /blog), determinamos el tab activo por la URL
    const externalItem = items.find(item => item.isExternal && pathname === item.url)
    
    if (externalItem) {
      setActiveTab(externalItem.name)
    } else if (pathname === '/') {
      // Verificar si hay un scroll pendiente en sessionStorage
      const pendingScrollTarget = sessionStorage.getItem('pendingScrollTarget')
      
      if (pendingScrollTarget) {
        sessionStorage.removeItem('pendingScrollTarget')
        
        // Actualizar el tab activo con la sección destino
        const targetItem = items.find(item => item.url === pendingScrollTarget)
        if (targetItem) {
          setActiveTab(targetItem.name)
        }
        
        // Esperar a que el DOM esté listo y hacer scroll
        setTimeout(() => {
          isClicking.current = true
          scrollToTarget(pendingScrollTarget)
          setTimeout(() => {
            isClicking.current = false
          }, 1500)
        }, 150)
        
        return // No iniciar el observer inmediatamente
      }
      
      // Para la página de inicio, usamos Intersection Observer con mejor detección
      const sectionVisibility = new Map<string, number>();

      const observer = new IntersectionObserver(
        (entries) => {
          if (isClicking.current) {
            return;
          }

          entries.forEach((entry) => {
            // Guardamos el ratio de visibilidad de cada sección
            sectionVisibility.set(entry.target.id, entry.intersectionRatio);
          });

          // Encontramos la sección con mayor visibilidad
          let maxVisibility = 0;
          let mostVisibleSection = '';

          sectionVisibility.forEach((ratio, sectionId) => {
            if (ratio > maxVisibility) {
              maxVisibility = ratio;
              mostVisibleSection = sectionId;
            }
          });

          if (mostVisibleSection && maxVisibility > 0.1) {
            const navItem = items.find((item) => item.url === mostVisibleSection);
            if (navItem) {
              setActiveTab(navItem.name);
            }
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-80px 0px -20% 0px',
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
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-40 pt-4 md:pt-6 px-4 md:px-0 w-full md:w-auto">
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 bg-white/65 dark:bg-white/35 border backdrop-blur-md py-1 px-1.5 sm:px-2 md:px-1 rounded-full shadow-lg animate-fade-in-down animate-duration-600">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.isExternal || item.isRoute ? item.url : pathname === '/' ? `#${item.url}` : `/#${item.url}`}
              onClick={(e) => {
                if (!item.isExternal && !item.isRoute) {
                  e.preventDefault();
                  setActiveTab(item.name);
                  
                  // Si estamos en la página principal, hacer scroll directo
                  if (pathname === '/') {
                    isClicking.current = true;
                    scrollToTarget(item.url);
                    setTimeout(() => {
                      isClicking.current = false;
                    }, 1000);
                  } else {
                    // Si estamos en otra página, guardar el scroll pendiente en sessionStorage y navegar a home
                    sessionStorage.setItem('pendingScrollTarget', item.url);
                    router.push('/');
                  }
                } else {
                  // Para rutas y enlaces externos, solo actualizamos el estado activo
                  setActiveTab(item.name);
                }
              }}
              className={cn(
                `relative cursor-pointer text-base font-fira font-semibold rounded-full transition-colors whitespace-nowrap ${item.style}`,
                "px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2",
                "text-foreground/80 hover:text-primary",
                "flex items-center justify-center",
                isActive && "bg-slate-200 dark:bg-slate-900 text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 35,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 sm:w-10 md:w-12 h-1 bg-primary rounded-t-full" />
                </motion.div>
              )}
            </Link>
          )
        })}
        <div className="flex items-center justify-center pl-2 sm:pl-4 md:pl-6 pr-1 sm:pr-1.5 md:pr-2 min-w-12 sm:min-w-14 md:min-w-16">
          <AnimatedThemeToggler />
        </div>
      </div>
    </div>
  )
}