"use client"
import Image from "next/image"
import TypeWritting from "./TypeWritting"

export default function ReadingSection() {
  return (
    <section className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 px-4 md:px-6">
      <div className="w-full lg:w-[60%] flex flex-col justify-center lg:px-[2rem]">
        <TypeWritting />
        <div className="mt-2">
          <h1 className="w-full text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-sans leading-tight">
            Tomás Santander.
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-[2.5rem] xl:text-[3.2rem] xl:leading-[3.5rem] font-sans font-semibold text-white/70 backdrop-blur-sm mt-2">
            Diseño y desarrollo soluciones que optimizan y generan impacto.
          </h1>
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex items-center justify-center">
        <div className="relative w-full max-w-[320px] md:max-w-[380px] mx-auto">
          <Image
            src="/images/image_personal.webp"
            alt="Imagen personal Tomás Santander"
            width={1290}
            height={1437}
            priority
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}