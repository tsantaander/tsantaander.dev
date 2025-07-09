"use client"

import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbMail,
} from "react-icons/tb"
import { Code, Layers, UserRound, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"

const networks = [
  {
    name: "Github",
    icon: TbBrandGithub,
    href: "https://github.com/tsantaander",
    color: "hover:bg-purple-600",
  },
  {
    name: "Linkedin",
    icon: TbBrandLinkedin,
    href: "https://www.linkedin.com/in/tomas-santander/",
    color: "hover:bg-blue-600",
  },
  {
    name: "Email",
    icon: TbMail,
    href: "x.santander.soto@outlook.cl",
    color: "hover:bg-rose-400",
  },
  {
    name: "Instagram",
    icon: TbBrandInstagram,
    href: "https://www.instagram.com/tsantaander/",
    color: "hover:bg-pink-600",
  },
]

const SocialNetworks = () => {
  return (
    <div className="relative z-20 mt-4 sm:mt-0">
      <div className="flex flex-wrap items-center gap-2">
        {networks.map((network) => (
          <a
            key={network.name}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`border border-gray-600 p-2 rounded-xl sm:rounded-2xl ${network.color} transition-all duration-300 hover:scale-115`}
          >
            <network.icon className="size-5 sm:size-6 md:size-7 lg:size-8 hover:text-white" />
          </a>
        ))}
      </div>
    </div>
  )
}

const AreasDeExperiencia = () => {
  const { theme, systemTheme } = useTheme()

  const currentTheme = theme === "system" ? systemTheme : theme
  return (
    <>
      <Separator />
      <div className="flex items-center justify-center w-full py-2">
        <h1 className="text-2xl text-center font-medium">Áreas de Experiencia</h1>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 "
        key={currentTheme}
      >
        <motion.div
          className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex flex-col items-center text-center cursor-pointer transition-colors duration-300"
          whileHover={{
            scale: 1.05,
            backgroundColor:
              currentTheme === "dark"
                ? "rgba(167, 139, 250, 0.2)"
                : "rgb(243 232 255)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 },
            }}
          >
            <Code className="h-8 w-8 text-purple-500 dark:text-purple-400 mb-2 transition-colors duration-300" />
          </motion.div>
          <h4 className="font-medium dark:text-white transition-colors duration-300">
            FrontEnd
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Creando soluciones mantenibles y elegantes
          </p>
        </motion.div>

        <motion.div
          className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex flex-col items-center text-center cursor-pointer transition-colors duration-300"
          whileHover={{
            scale: 1.05,
            backgroundColor:
              currentTheme === "dark"
                ? "rgba(96, 165, 250, 0.2)"
                : "rgb(219 234 254)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            whileHover={{
              y: [0, -8, 0],
              transition: { duration: 0.6, repeat: 0 },
            }}
          >
            <Layers className="h-8 w-8 text-blue-500 dark:text-blue-400 mb-2 transition-colors duration-300" />
          </motion.div>
          <h4 className="font-medium dark:text-white transition-colors duration-300">
            BackEnd
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Construyendo sistemas escalables y reutilizables
          </p>
        </motion.div>

        <motion.div
          className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex flex-col items-center text-center cursor-pointer transition-colors duration-300"
          whileHover={{
            scale: 1.05,
            backgroundColor:
              currentTheme === "dark"
                ? "rgba(251, 191, 36, 0.2)"
                : "rgb(254 243 199)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div
            whileHover={{
              scale: [1, 1.2, 1],
              transition: { duration: 0.5 },
            }}
          >
            <Zap className="h-8 w-8 text-amber-500 dark:text-amber-400 mb-2 transition-colors duration-300" />
          </motion.div>
          <h4 className="font-medium dark:text-white transition-colors duration-300">
            DevOps
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Optimización de la velocidad y eficiencia
          </p>
        </motion.div>
      </div>
    </>
  )
}

const SpecializedSkills = () => {
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
  }

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
      name: "Tailwind CSS",
      color: "hover:bg-indigo-600",
    },
    {
      name: "Zustand",
      color: "hover:bg-stone-700",
    },
    {
      name: "UI/UX",
      color: "hover:bg-emerald-800",
    },
    {
      name: "Diseño Responsivo",
      color: "hover:bg-rose-400",
    },
    {
      name: "Optimización de rendimiento",
      color: "hover:!bg-blue-600",
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

export default function AboutMe() {
  return (
    <>
      <div className="flex flex-col mx-auto gap-6 max-w-[75%] backdrop-blur-[1.5px]">
        <div className="relative h-full bg-gray-500/20 dark:bg-slate-700/30 rounded-2xl border p-2 md:rounded-3xl md:p-3 col-span-1 md:col-span-2 lg:col-span-3 order-1 md:order-2">
          <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
            <div className="relative flex flex-1 flex-col gap-6">
              <div className="flex w-full md:flex-row flex-col items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border border-gray-600 p-2">
                    {/* Icono */}
                    <UserRound className="size-4 text-black dark:text-neutral-400" />
                  </div>

                  <div>
                    <p className="text-lg sm:text-2xl relative z-20 mt-2 font-medium">
                      Tomás Alexander Santander Soto
                    </p>
                    <p className="relative z-20 text-sm sm:text-lg text-slate-600 dark:text-neutral-400 font-medium uppercase">
                      Tegma Solutions Ltda.
                    </p>
                    <p className="relative z-20 text-sm sm:text-lg text-slate-600 dark:text-neutral-400 font-medium uppercase">
                      FullStack Developer
                    </p>
                  </div>
                </div>

                <SocialNetworks />
              </div>
              <div className="space-y-6 flex-1 flex flex-col items-center justify-center">
                <h3 className="pt-0.5 text-lg font-bold text-balance text-black md:text-4xl dark:text-white">
                  Un apasionado por el Desarrollo, Eficiencia de los sistemas y la Informática.
                </h3>
                <h2 className="text-sm/[1.125rem] text-black md:text-lg/[1.5rem] dark:text-neutral-300 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                  Me apasiona aprender, liderar y resolver desafíos complejos, siempre analizando y reflexionando sobre cómo cada experiencia contribuye al crecimiento personal, del equipo y las organizaciones empresariales.
                </h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Conocimiento especializado</h3>
                <SpecializedSkills />
              </div>

              <AreasDeExperiencia />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

