"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Home, User, Briefcase, FileText } from 'lucide-react'
import ThemeToggle from "@/components/ui/themeToggle";
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

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
      <div className="flex items-center gap-3 bg-white/60 border backdrop-blur-xl py-1 px-1 rounded-full shadow-lg animate-fade-in-down animate-duration-600">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={`#${item.url}`}
              onClick={(e) => {
                setActiveTab(item.name);
                e.preventDefault();
                scrollToTarget(item.url);

              }}
              className={cn(
                `relative cursor-pointer text-base font-fira font-semibold px-6 py-2 rounded-full transition-colors whitespace-nowrap ${item.style}`,
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
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
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
