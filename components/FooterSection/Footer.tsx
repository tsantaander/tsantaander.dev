"use client"
import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {FaGithub, FaLinkedin, FaGit} from 'react-icons/fa'
import Sparkles from './SparklesComponent';
import { useInView } from 'react-intersection-observer';

export default function Footer () {
  const { ref, inView } = useInView({
    threshold: 0, // El observador se dispara tan pronto como 1 píxel del elemento es visible
    triggerOnce: false, // Opcional: Solo dispara una vez cuando entra al viewport
    rootMargin: '0px 0px 200px 0px', // Opcional: Carga cuando está a 200px del final del viewport
  });
  return (
    <footer className="bg-black pt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-primary max-sm:text-center">Portafolio de Tomás Santander</h2>
            <p className="text-muted-foreground mt-2 text-lg max-sm:text-center">Diseño y desarrollo soluciones que optimizan y generan impacto</p>
          </div>
          <nav className="flex flex-wrap text-xl justify-center md:justify-end gap-6">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
            <a href="#aboutme" className="text-muted-foreground hover:text-primary transition-colors">Acerca de mi</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Proyectos</a>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contacto</a>
          </nav>
        </div>
        <Separator className="my-8" />
      <div ref={ref}>
        {inView ? <Sparkles /> : (
          <div className='h-[25rem] w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md'>
            Cargando...
          </div>
        )}
        
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pb-4">
          <p className="text-lg text-muted-foreground mb-4 md:mb-0">
            ©2025 Tomás Alexander Santander Soto. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="lg" className='!rounded-full'>
              <FaGithub className="h-12 w-12 tex-dark dark:text-white" />
            </Button>
            <Button variant="ghost" size="lg" className='!rounded-full'>
              <FaLinkedin className="h-12 w-12 tex-dark dark:text-white" />
            </Button>
            <Button variant="ghost" size="lg" className='!rounded-full'>
              <FaGit className="h-12 w-12 tex-dark dark:text-white" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};