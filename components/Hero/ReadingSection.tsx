"use client"
import TypeWritting from "./TypeWritting"

export default function ReadingSection() {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-6 lg:gap-8 px-4 md:px-12 text-center">
      <div className="w-full flex flex-col items-center justify-center mx-auto">
        <TypeWritting />
        <div className="mt-2 flex flex-col items-center">
          <h1 className="w-full text-center text-4xl sm:text-[5rem] lg:text-[6rem] xl:text-[6.5rem] font-sans font-semibold leading-tight animate-blurred-fade-in animate-duration-300 animate-delay-400">
            Tomás Santander
          </h1>
          <h2 className="w-full text-center text-2xl sm:text-4xl lg:text-[2.5rem] xl:text-[3rem] font-sans font-semibold leading-tight animate-blurred-fade-in animate-duration-300 animate-delay-800">
            Desarrollador <span className="text-blue-500">FullStack</span>
          </h2>
          <h1 className="max-w-3xl text-center font-medium text-xl font-sans text-white/70 mt-10 animate-blurred-fade-in animate-duration-300 animate-delay-[1200ms]">
            Diseño y Construyo soluciones de extremo a extremo, orquestando ecosistemas y experiencias digitales de alto rendimiento. Motivado por el aprendizaje continuo y el impacto estratégico del software.
          </h1>
        </div>
      </div>
    </section>
  )
}