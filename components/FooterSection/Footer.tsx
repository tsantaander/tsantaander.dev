"use client"
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaGit } from 'react-icons/fa'
import Sparkles from './SparklesComponent';
import { useInView } from 'react-intersection-observer';

export default function Footer() {
  const { ref, inView } = useInView({
    threshold: 0, // El observador se dispara tan pronto como 1 píxel del elemento es visible
    triggerOnce: false, // Opcional: Solo dispara una vez cuando entra al viewport
    rootMargin: '0px 0px 200px 0px', // Opcional: Carga cuando está a 200px del final del viewport
  });
  return (
    <footer className="bg-white dark:bg-black pt-12 border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-black dark:text-white max-sm:text-center transition-colors">Portafolio de Tomás Santander</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-lg max-sm:text-center transition-colors">Diseño y desarrollo soluciones que optimizan y generan impacto</p>
          </div>
          <nav className="flex flex-wrap text-xl justify-center md:justify-end gap-6">
            <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Inicio</Link>
            <a href="#aboutme" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Acerca de mi</a>
            <a href="#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Proyectos</a>
            <Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Blog</Link>
            <a href="#contact" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">Contacto</a>
          </nav>
        </div>
        <Separator className="my-8" />
        <div ref={ref}>
          {inView ? <Sparkles /> : (
            <div className='h-[25rem] w-full bg-neutral-100 dark:bg-neutral-900/50 flex flex-col items-center justify-center overflow-hidden rounded-md transition-colors'>
              <span className="text-neutral-500 dark:text-neutral-400">Cargando...</span>
            </div>
          )}

        </div>
        <div className="flex items-center justify-center pb-4">
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4 md:mb-0 transition-colors">
            ©2026 Tomás Alexander Santander Soto. Todos los derechos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
};