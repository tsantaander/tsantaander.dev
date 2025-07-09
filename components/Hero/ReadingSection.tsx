"use client"
import Image from "next/image"
import TypeWritting from "./TypeWritting"

export default function ReadingSection() {
  return (
    <section className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 px-4 md:px-6">
      <div className="w-full lg:w-[60%] flex flex-col justify-center lg:px-[2rem]">
        <TypeWritting />
        <div className="mt-2">
          <h1 className="w-full text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-sans font-semibold leading-tight animate-blurred-fade-in animate-duration-300 animate-delay-400">
            Tomás Santander
          </h1>
          <h2 className="w-full text-4xl sm:text-2xl lg:text-[1.5rem] xl:text-[2.3rem] font-sans font-semibold leading-tight animate-blurred-fade-in animate-duration-300 animate-delay-800">
            FullStack Developer
          </h2>
          <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-[1rem] xl:text-[1.8rem] xl:leading-[3.5rem] font-sans font-base text-white/70 backdrop-blur-xs mt-10 animate-blurred-fade-in animate-duration-300 animate-delay-[1200ms]">
            Diseño y desarrollo soluciones que optimizan y generan impacto
          </h1>
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex items-center justify-center">
        <div className="relative max-w-[220px] md:max-w-[350px] lg:max-w-[450px] xl:max-w-[450px] mx-auto animate-blurred-fade-in animate-duration-600 animate-delay-[1600ms]">
          <Image
            src="/images/personal.webp"
            alt="Imagen personal Tomás Santander"
            width={1920}
            height={0}
            priority
            className="w-full h-full object-cover mask-radial-at-center mask-radial-from-90% mask-r-from-90% mask-l-from-75% mask-b-from-80% mask-t-from-65% "
          />
        </div>
      </div>
    </section>
  )
}