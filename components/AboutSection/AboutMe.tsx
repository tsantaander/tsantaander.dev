"use client"

import { Code2, Briefcase, GraduationCap, Sparkles } from "lucide-react"
import { SocialNetworks } from "./SocialNetworks"
import { AreasDeExperiencia } from "./AreasExperiencia"
import { StackEspecializado } from "./StackEspecializado"

export default function AboutMe() {
  return (
    <section id="aboutme" className="relative w-full min-h-screen py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 dark:border-blue-400/20 mb-4">
            <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Sobre Mí</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Conoce al desarrollador
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
          
          {/* Main Profile Card - Spans 8 columns on lg */}
          <div className="md:col-span-6 lg:col-span-8 group">
            <div className="h-full p-6 md:p-8 rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="flex flex-col h-full">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  {/* Avatar Placeholder */}
                  <div className="relative shrink-0">
                    <div className="size-20 md:size-24 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <span className="text-3xl md:text-4xl font-bold text-white">TS</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 rounded-full border-4 border-slate-50 dark:border-slate-900" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      Tomás Alexander Santander Soto
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      Full Stack Developer
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <GraduationCap className="size-3.5" />
                        Ing. Informática
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
                    Me apasiona aprender, liderar y resolver desafíos complejos. Siempre analizo y reflexiono sobre cómo cada experiencia contribuye al crecimiento personal, del equipo y las organizaciones empresariales.
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
          </div>

          {/* Social Networks Card - Spans 4 columns on lg */}
          <div className="md:col-span-6 lg:col-span-4">
            <div className="h-full p-6 md:p-8 rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600">
                    <Code2 className="size-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Conecta conmigo</h4>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Encuéntrame en las principales plataformas de desarrollo y redes profesionales.
                </p>
                <div className="mt-auto">
                  <SocialNetworks />
                </div>
              </div>
            </div>
          </div>

          {/* Quote/Philosophy Card - Full width */}
          <div className="md:col-span-6 lg:col-span-12">
            <div className="p-6 md:p-8 rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed">
                  &ldquo;Un apasionado por el Desarrollo, la Eficiencia de los sistemas y la Informática.&rdquo;
                </blockquote>
                <p className="mt-4 text-blue-100 text-sm md:text-base">
                  — Filosofía de trabajo
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="h-full p-6 md:p-8 rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5">
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
          </div>

          {/* Experience Areas Card - Spans 7 columns */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="h-full p-6 md:p-8 rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5">
              <AreasDeExperiencia />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}