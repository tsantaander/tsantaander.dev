"use client"
import React, { useState, useEffect, useId, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import { BsWindowSplit } from "react-icons/bs"
import { LuServerCog, LuWrench, LuBrain, LuLayers } from "react-icons/lu"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { Progress } from "@/components/ui/progress"
import { IconType } from "react-icons"
import { useResponsive } from "@/context/ResponsiveContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const nivelAValor = (nivel: string): number => {
  const niveles: Record<string, number> = {
    'Inicial': 30,
    'Intermedio': 60,
    'Intermedio-Avanzado': 75,
    'Avanzado': 90,
    'Experto': 100
  };
  return niveles[nivel] || 50;
};

// Transición para desktop - layout animations suaves
const desktopLayoutTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

// Componente para renderizar iconos con tipado correcto
const IconRenderer = ({ icon: Icon, className }: { icon: IconType; className: string }) => (
  <Icon className={className} />
);

interface AreaTecnologia {
  nombre: string;
  nivel: string;
}

interface AreaExperiencia {
  id: string;
  titulo: string;
  descripcion: string;
  icono: IconType;
  color: string;
  tecnologias: AreaTecnologia[];
  experiencia: string;
}

const areasExperiencia: AreaExperiencia[] = [
  {
    id: 'frontend',
    titulo: 'FrontEnd',
    descripcion: 'Creando soluciones mantenibles y elegantes con las últimas tecnologías del ecosistema web moderno.',
    icono: BsWindowSplit,
    color: 'from-blue-500 to-cyan-500',
    tecnologias: [
      { nombre: 'React', nivel: 'Avanzado' },
      { nombre: 'TypeScript', nivel: 'Intermedio-Avanzado' },
      { nombre: 'Next.js', nivel: 'Intermedio-Avanzado' },
      { nombre: 'Tailwind CSS', nivel: 'Avanzado' },
      { nombre: 'Redux', nivel: 'Intermedio' },
      { nombre: 'Shadcn UI', nivel: 'Avanzado' },
    ],
    experiencia: '3+ años'
  },
  {
    id: 'backend',
    titulo: 'BackEnd',
    descripcion: 'Construyendo APIs robustas y sistemas escalables con las mejores prácticas de desarrollo.',
    icono: LuServerCog,
    color: 'from-emerald-500 to-teal-500',
    tecnologias: [
      { nombre: 'Node.js', nivel: 'Intermedio' },
      { nombre: 'Express', nivel: 'Inicial' },
      { nombre: 'MongoDB', nivel: 'Intermedio' },
      { nombre: 'PostgreSQL', nivel: 'Intermedio' },
      { nombre: 'FastAPI', nivel: 'Inicial' },
    ],
    experiencia: '2+ años'
  },
  {
    id: 'devops',
    titulo: 'DevOps',
    descripcion: 'Automatizando despliegues y mejorando la integración continua para un desarrollo más eficiente.',
    icono: LuLayers,
    color: 'from-orange-500 to-amber-500',
    tecnologias: [
      { nombre: 'Docker', nivel: 'Intermedio' },
      { nombre: 'GitHub Actions', nivel: 'Intermedio' },
      { nombre: 'AWS', nivel: 'Intermedio' },
      { nombre: 'CI/CD', nivel: 'Inicial' },
      { nombre: 'Nginx', nivel: 'Inicial' },
    ],
    experiencia: '1+ año'
  },
  {
    id: 'knowledge',
    titulo: 'Conocimientos',
    descripcion: 'Utilizando herramientas modernas para mejorar la eficiencia y productividad.',
    icono: LuBrain,
    color: 'from-purple-500 to-pink-500',
    tecnologias: [
      { nombre: 'Linux', nivel: 'Intermedio-Avanzado' },
      { nombre: 'Windows', nivel: 'Intermedio' },
      { nombre: 'Metodologías ágiles', nivel: 'Intermedio' },
      { nombre: 'VSCode', nivel: 'Intermedio' },
      { nombre: 'Figma', nivel: 'Intermedio' },
      { nombre: 'Jira', nivel: 'Intermedio' },
    ],
    experiencia: '1+ año'
  },
  {
    id: 'tools',
    titulo: 'Herramientas',
    descripcion: 'Utilizando herramientas modernas para mejorar la eficiencia y productividad.',
    icono: LuWrench,
    color: 'from-rose-500 to-red-500',
    tecnologias: [
      { nombre: 'Linux', nivel: 'Intermedio' },
      { nombre: 'Git', nivel: 'Intermedio' },
      { nombre: 'GitHub', nivel: 'Intermedio' },
      { nombre: 'Windsurf', nivel: 'Intermedio' },
      { nombre: 'VSCode', nivel: 'Intermedio' },
      { nombre: 'Figma', nivel: 'Intermedio' },
      { nombre: 'Jira', nivel: 'Intermedio' },
    ],
    experiencia: '1+ año'
  }
];

export const AreasDeExperiencia = () => {
  const [active, setActive] = useState<AreaExperiencia | boolean | null>(null);
  const [mobileDialogOpen, setMobileDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<AreaExperiencia | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { isMobile } = useResponsive();
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setActive(null), []);

  const handleMobileOpen = useCallback((area: AreaExperiencia) => {
    setSelectedArea(area);
    setMobileDialogOpen(true);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileDialogOpen(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, handleClose);

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-linear-to-br from-violet-500 to-purple-600">
            <LuLayers className="size-5 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Áreas de Experiencia</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Especialidades y conocimientos</p>
          </div>
        </div>

        {/* Portal para Overlay y Modal - Solo Desktop */}
        {isMounted && !isMobile && createPortal(
          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                key={`modal-container-${active.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-50"
              >
                {/* Overlay */}
                <div
                  onClick={handleClose}
                  className="absolute inset-0 bg-black/50 backdrop-blur-md"
                />

                {/* Modal */}
                <div className="absolute inset-0 grid place-items-center px-4 sm:px-0 pointer-events-none">
                  <motion.div
                    layoutId={`card-${active.id}-${id}`}
                    ref={ref}
                    transition={desktopLayoutTransition}
                    className="w-full max-w-[500px] max-h-[80%] md:max-h-[85%] flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
                  >
                    {/* Header con gradiente */}
                    <div
                      className={`w-full h-24 sm:h-32 flex items-center justify-center bg-linear-to-br ${active.color} shrink-0`}
                    >
                      <IconRenderer icon={active.icono} className="size-10 sm:size-14 text-white" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 overflow-y-auto overscroll-contain">
                      <div className="flex justify-between items-start py-3 sm:py-4 px-4 sm:px-6 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex-1 pr-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-2xl">
                            {active.titulo}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                            {active.experiencia} de experiencia
                          </p>
                        </div>

                        <button
                          onClick={handleClose}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          <svg className="size-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <div className="space-y-4 sm:space-y-5">
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{active.descripcion}</p>

                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3 sm:mb-4">Tecnologías y Nivel</h4>
                            <div className="space-y-2.5 sm:space-y-3">
                              {active.tecnologias.map((tech, index) => (
                                <div key={index} className="space-y-1 sm:space-y-1.5">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{tech.nombre}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{tech.nivel}</span>
                                  </div>
                                  <Progress 
                                    value={nivelAValor(tech.nivel)} 
                                    className="h-1.5 bg-slate-100 dark:bg-slate-800"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* Dialog de shadcn para móvil */}
        <Dialog open={mobileDialogOpen} onOpenChange={setMobileDialogOpen}>
          <DialogContent 
            className="max-w-[calc(100%-2rem)] max-h-[85vh] overflow-hidden p-0 gap-0 rounded-2xl"
            showCloseButton={false}
          >
            {selectedArea && (
              <>
                {/* Header con gradiente */}
                <div
                  className={`w-full h-24 flex items-center justify-center bg-linear-to-br ${selectedArea.color} shrink-0`}
                >
                  <IconRenderer icon={selectedArea.icono} className="size-10 text-white" />
                </div>

                {/* Header con título */}
                <DialogHeader className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2 text-left">
                      <DialogTitle className="font-bold text-gray-900 dark:text-white text-lg">
                        {selectedArea.titulo}
                      </DialogTitle>
                      <DialogDescription className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {selectedArea.experiencia} de experiencia
                      </DialogDescription>
                    </div>
                    <button
                      onClick={handleMobileClose}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <svg className="size-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </DialogHeader>

                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
                  <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {selectedArea.descripcion}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                        Tecnologías y Nivel
                      </h4>
                      <div className="space-y-2.5">
                        {selectedArea.tecnologias.map((tech, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-medium text-slate-700 dark:text-slate-300">{tech.nombre}</span>
                              <span className="text-slate-500 dark:text-slate-400">{tech.nivel}</span>
                            </div>
                            <Progress 
                              value={nivelAValor(tech.nivel)} 
                              className="h-1.5 bg-slate-100 dark:bg-slate-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {areasExperiencia.map((area) => (
            isMobile ? (
              // Móvil: abre Dialog de shadcn
              <div
                key={area.id}
                onClick={() => handleMobileOpen(area)}
                className={`cursor-pointer h-20 w-full rounded-xl flex flex-col items-center justify-center bg-linear-to-br ${area.color} active:scale-95 transition-transform duration-100`}
              >
                <IconRenderer icon={area.icono} className="size-6 text-white mb-1" />
                <h3 className="font-medium text-white text-xs text-center px-2">
                  {area.titulo}
                </h3>
                <p className="text-white/80 text-[10px]">
                  {area.experiencia}
                </p>
              </div>
            ) : (
              // Desktop: con layoutId para animación fluida
              <motion.div
                layoutId={`card-${area.id}-${id}`}
                key={area.id}
                onClick={() => setActive(area)}
                transition={desktopLayoutTransition}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`cursor-pointer h-24 w-full rounded-xl flex flex-col items-center justify-center bg-linear-to-br ${area.color} hover:shadow-lg hover:shadow-black/20 transition-shadow duration-200`}
              >
                <IconRenderer icon={area.icono} className="size-7 text-white mb-1" />
                <h3 className="font-medium text-white text-sm text-center px-2">
                  {area.titulo}
                </h3>
                <p className="text-white/80 text-xs">
                  {area.experiencia}
                </p>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </>
  )
}