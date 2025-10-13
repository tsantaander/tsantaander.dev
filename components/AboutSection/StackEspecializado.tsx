"use client"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"

export const StackEspecializado = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }
  
    // Animation variants for individual skill badges
    const badgeVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    } as const;
  
    // Habilidades especializadas
    const skills = [
      {
        name: "React",
        color: "hover:bg-cyan-600",
      },
      {
        name: "Next.js",
        color: "hover:bg-emerald-400",
      },
      {
        name: "TypeScript",
        color: "hover:bg-sky-500",
      },
      {
        name: "Vercel",
        color: "hover:!bg-blue-600",
      },
      {
        name: "Tailwind CSS",
        color: "hover:bg-indigo-600",
      },
      {
        name: "Supabase",
        color: "hover:bg-green-700",
      },
      {
        name: "Shadcn UI",
        color: "hover:bg-sky-800",
      },
    ]
    return (
      <motion.div
        className="flex flex-wrap gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={badgeVariants}
            whileHover={{
              scale: 1.08,
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge
              key={index}
              variant="secondary"
              className={`select-none text-base hover:text-white px-3 py-1 cursor-pointer transition-colors duration-300 ${skill.color}`}
            >
              {skill.name}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    )
  }