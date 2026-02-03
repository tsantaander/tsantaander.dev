"use client"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { ReactLight } from "@/components/ui/svgs/reactLight"
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark"
import { Typescript } from "@/components/ui/svgs/typescript"
import { Vercel } from "@/components/ui/svgs/vercel"
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss"
import { Supabase } from "@/components/ui/svgs/supabase"
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi"

export const StackEspecializado = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  } as const;

  const skills = [
    {
      name: "React",
      color: "hover:bg-cyan-500 hover:border-cyan-500",
      icon: ReactLight,
    },
    {
      name: "Next.js",
      color: "hover:bg-slate-700 hover:border-slate-700",
      icon: NextjsIconDark,
    },
    {
      name: "TypeScript",
      color: "hover:bg-blue-500 hover:border-blue-500",
      icon: Typescript,
    },
    {
      name: "Vercel",
      color: "hover:bg-slate-800 hover:border-slate-800",
      icon: Vercel,
    },
    {
      name: "Tailwind CSS",
      color: "hover:bg-teal-500 hover:border-teal-500",
      icon: Tailwindcss,
    },
    {
      name: "Supabase",
      color: "hover:bg-emerald-600 hover:border-emerald-600",
      icon: Supabase,
    },
    {
      name: "Shadcn UI",
      color: "hover:bg-slate-600 hover:border-slate-600",
      icon: ShadcnUi,
    },
  ]
  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          variants={badgeVariants}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Badge
            key={index}
            variant="outline"
            className={`select-none text-xs sm:text-sm font-medium hover:text-white px-3 py-1.5 cursor-pointer transition-all duration-300 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 pl-2 ${skill.color}`}
          >
            <skill.icon className="size-3.5 sm:size-4 mr-1.5 shrink-0" />
            {skill.name}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  )
}