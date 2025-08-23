"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { scrollToTarget } from "@/components/ui/scrollAnimation"

const navItems = [
  { name: 'Home', url: 'home', icon: Home, style: "animate-pulse-fade-in animate-delay-500 animate-duration-100" },
  { name: 'Acerca de mi', url: 'aboutme', icon: User, style: "animate-pulse-fade-in animate-delay-700 animate-duration-100" },
  { name: 'Proyectos', url: 'projects', icon: Briefcase, style: "animate-pulse-fade-in animate-delay-800 animate-duration-100" },
  { name: 'Contacto', url: 'contact', icon: FileText, style: "animate-pulse-fade-in animate-delay-900 animate-duration-100" }
]
type NavBarProps = {
  items?: {
    name: string
    url: string
    style: string
    icon: LucideIcon
  }[]
}

export default function NavBar({ items = navItems }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const isClicking = useRef(false)

  useEffect(() => {
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
        // El umbral (threshold) de 0.5 significa que la sección se considera activa
        // cuando al menos el 50% de ella es visible.
        threshold: 0.5,
        // rootMargin ajusta el "viewport" de observación.
        // -80px en la parte superior para compensar la altura del NavBar.
        // -40% en la parte inferior para que la sección activa esté más centrada.
        rootMargin: "-80px 0px -40% 0px"
      }
    );
    const sections = items.map((item) => document.getElementById(item.url));
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
    // Limpieza al desmontar el componente
    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [items]);


  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
      <div className="flex items-center gap-3 bg-white/65 dark:bg-white/35 border backdrop-blur-md py-1 px-1 rounded-full shadow-lg animate-fade-in-down animate-duration-600">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={`#${item.url}`}
              onClick={(e) => {
                e.preventDefault();
                isClicking.current = true;
                setActiveTab(item.name);
                scrollToTarget(item.url);
                // Después de 1 segundo, permitimos que el observador vuelva a tomar el control.
                setTimeout(() => {
                  isClicking.current = false;
                }, 1000);
              }}
              className={cn(
                `relative cursor-pointer text-base font-fira font-semibold px-6 py-2 rounded-full transition-colors whitespace-nowrap ${item.style}`,
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
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
