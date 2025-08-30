"use client"

import { GlowingEffect } from "@/components/ui/glowing-effect"
import { UserRound } from "lucide-react"
import { useResponsive } from "@/context/ResponsiveContext";
import { SocialNetworks } from "./SocialNetworks"
import { AreasDeExperiencia } from "./AreasExperiencia"
import { StackEspecializado } from "./StackEspecializado"
import DotGrid from "@/components/ui/dotgrid"

export default function AboutMe() {
  const { isMobile } = useResponsive();
  
  return (
    <div id="aboutme" className="relative w-full min-h-screen py-12 flex items-center justify-center">
      {/* Fondo con DotGrid */}
      <div className="absolute inset-0 -z-10 bg-white dark:bg-black">
        <DotGrid
          dotSize={4}
          gap={15}
          baseColor="#bcbcbc"
          darkBaseColor="#333333"
          activeColor="#155DFC"
          proximity={150}
          shockRadius={250}
          shockStrength={1}
          resistance={500}
          returnDuration={1.5}
        />
      </div>

      <div className="w-full flex flex-col gap-6 sm:max-w-[95%] lg:max-w-[90%] relative">
        <div className="relative h-full bg-gray-700/20 dark:bg-slate-700/30 rounded-2xl border p-2 md:rounded-3xl md:p-3 col-span-1 md:col-span-2 lg:col-span-3 backdrop-blur-[2.5px]">
          {!isMobile && <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />}
          <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
            <div className="relative flex flex-1 flex-col gap-6">
              <div className="flex w-full md:flex-row flex-col items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border border-gray-600 p-2">
                    <UserRound className="size-4 text-black dark:text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl relative z-20 mt-2 font-medium">
                      Tomás Alexander Santander Soto
                    </p>
                    <p className="relative z-20 text-sm sm:text-lg text-slate-600 dark:text-neutral-400 font-medium">
                      TEGMA SOLUTIONS SpA.
                    </p>
                    <p className="relative z-20 text-sm sm:text-lg text-slate-600 dark:text-neutral-400 font-medium uppercase">
                      Estudiante de Ingeniería Informática | Full Stack Developer con enfoque FrontEnd | <br/> 
                      CEO y Fundador de Tegma Solutions
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
                <h3 className="text-lg font-semibold">Stack Tecnológico</h3>
                <StackEspecializado />
              </div>

              <AreasDeExperiencia />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

