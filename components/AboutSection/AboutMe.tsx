"use client"

import { Code2, Briefcase, GraduationCap, CircleUserRound } from "lucide-react"
import { SocialNetworks } from "./SocialNetworks"
import { AreasDeExperiencia } from "./AreasExperiencia"
import { StackEspecializado } from "./StackEspecializado"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(sectionRef, { once: true, amount: 0.2 })

  const techRef = useRef<HTMLDivElement>(null)
  const isTechVisible = useInView(techRef, { once: true, amount: 0.2 })

  const areasRef = useRef<HTMLDivElement>(null)
  const isAreasVisible = useInView(areasRef, { once: true, amount: 0.2 })
  return (
    <section id="aboutme" className="relative w-full min-h-screen py-16 md:py-24 bg-white dark:bg-black overflow-hidden">
      <div ref={sectionRef} className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.h2
          className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:bg-linear-to-b dark:from-white dark:from-30% dark:to-white/30 dark:bg-clip-text dark:text-transparent text-balance leading-none tracking-tighte mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Acerca de mi
        </motion.h2>
        <motion.div
          className="bg-linear-to-r from-blue-700 via-blue-400 to-blue-700 max-w-36 sm:max-w-xs h-1 mx-auto rounded-full mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
        />


        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">

          {/* Main Profile Card - Spans 8 columns on lg */}
          <motion.div
            className="md:col-span-6 lg:col-span-8 group"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full p-6 md:p-8">
              <div className="flex flex-col h-full">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      Tomás Alexander Santander Soto
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      Desarrollador Full Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <GraduationCap className="size-3.5" />
                        Estudiante de Ing. Informática
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <Briefcase className="size-3.5" />
                        CEO @ Tegma Solutions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1 mb-6">
                  <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    Soy Desarrollador Full Stack especializado en el ecosistema JavaScript moderno, con un enfoque que va más allá del código: diseño soluciones. Mi experiencia se centra en transformar sistemas legacy en arquitecturas escalables utilizando Next.js y servicios BaaS, abarcando desde la infraestructura en la nube hasta interfaces de alto rendimiento optimizadas para SEO.
                    Sin embargo, mi valor diferencial no está solo en la técnica, sino en la estrategia. Me apasiona liderar desafíos complejos y reflexionar sobre cómo cada línea de código impacta en el crecimiento del producto y de la organización. Busco constantemente aprender y evolucionar, combinando la eficiencia técnica con una visión orientada a la estabilidad y el éxito del negocio a largo plazo.
                  </p>
                </div>
                {/* Filosofía */}
                <div className="relative text-center z-10 max-w-xl mx-auto mb-6">
                  <blockquote className="text-lg md:text-xl lg:text-2xl font-medium text-white leading-relaxed">
                    &ldquo;Un apasionado por el Desarrollo, la Eficiencia de los sistemas y la Informática.&rdquo;
                  </blockquote>
                  <p className="text-center mt-4 text-blue-100 text-sm md:text-base">
                    — Filosofía de trabajo —
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">3+</p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Años Exp.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">15+</p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Proyectos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">10+</p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Tecnologías</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imágen */}
          <motion.div
            className="md:col-span-6 lg:col-span-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative max-w-[220px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[450px] mx-auto">
              <Image
                src="/images/perfil_portafolio.png"
                alt="Imagen personal Tomás Santander"
                width={1920}
                height={0}
                quality={100}
                priority
                className="w-full h-full object-cover mask-radial-at-center mask-radial-from-70% mask-r-from-70% mask-l-from-70% mask-b-from-70% mask-t-from-70% "
              />
            </div>
          </motion.div>


          {/* Tech Stack Card */}
          <motion.div
            ref={techRef}
            className="md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 50 }}
            animate={isTechVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full p-6 md:p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600">
                  <Code2 className="size-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Stack Especializado</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tecnologías principales</p>
                </div>
              </div>
              <StackEspecializado />
            </div>
          </motion.div>

          {/* Experience Areas Card - Spans 7 columns */}
          <motion.div
            ref={areasRef}
            className="md:col-span-6 lg:col-span-7"
            initial={{ opacity: 0, y: 50 }}
            animate={isAreasVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full p-6 md:p-8 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5">
              <AreasDeExperiencia />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}