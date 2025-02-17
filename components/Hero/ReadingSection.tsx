import Image from 'next/image'

export default function ReadingSection() {
  return (
    <section className="flex flex-row">
      <div className="max-w-[60%]">
        <h2>Bienvenido, mi nombre es...</h2>
        <section>
          <h1 className="text-[5rem] font-sans">Tomás Santander.</h1>
          <h1 className="text-[3.2rem] font-sans font-semibold text-white/70 backdrop-blur-sm">Diseño y desarrollo soluciones que optimizan y generan impacto.</h1>
        </section>
      </div>
      <div className='flex items-center justify-center mx-auto w-[40%]'>
        <Image 
          src="/images/image_personal.webp"
          alt="imagen personal tomás santander"
          width={1290}
          height={1437}
          className="w-96 h-auto"
        />
      </div>

    </section>
  )
}