"use client"
import React, { useState, useEffect, useId, useRef, useCallback, memo } from "react"
import { AnimatePresence, motion, LayoutGroup } from "motion/react"
import { BsWindowSplit } from "react-icons/bs"
import { LuServerCog, LuWrench, LuBrain, LuLayers } from "react-icons/lu"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { Progress } from "@/components/ui/progress"
import type { IconType } from "react-icons"

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

interface AreaTecnologia {
  nombre: string;
  nivel: string;
}

interface AreaExperiencia {
  id: string;
  titulo: string;
  descripcion: string;
  Icono: IconType;
  color: string;
  tecnologias: AreaTecnologia[];
  experiencia: string;
}

const areasExperiencia: AreaExperiencia[] = [
  {
    id: 'frontend',
    titulo: 'FrontEnd',
    descripcion: 'Creando soluciones mantenibles y elegantes con las últimas tecnologías del ecosistema web moderno.',
    Icono: BsWindowSplit,
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
    Icono: LuServerCog,
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
    Icono: LuLayers,
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
    Icono: LuBrain,
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
    Icono: LuWrench,
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

// Configuración de transición optimizada para GPU
const layoutTransition = {
  type: "spring" as const,
  stiffness: 350,
  damping: 30,
  mass: 1,
};

// Componente de tarjeta memoizado para evitar re-renders
const AreaCard = memo(({ 
  area, 
  id, 
  onClick 
}: { 
  area: AreaExperiencia; 
  id: string; 
  onClick: () => void;
}) => (
  <motion.div
    layoutId={`card-${area.id}-${id}`}
    onClick={onClick}
    className="p-1 flex flex-col rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 will-change-transform"
    style={{ transform: "translateZ(0)" }}
    transition={layoutTransition}
  >
    <motion.div 
      layoutId={`image-${area.id}-${id}`}
      transition={layoutTransition}
    >
      <div className={`h-20 sm:h-24 w-full rounded-xl flex flex-col items-center justify-center bg-linear-to-br ${area.color}`}>
        <area.Icono className="size-6 sm:size-7 text-white mb-1" />
      </div>
    </motion.div>
    <div className="pt-2 px-1">
      <motion.h3
        layoutId={`title-${area.id}-${id}`}
        className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm text-center"
        transition={layoutTransition}
      >
        {area.titulo}
      </motion.h3>
      <motion.p
        layoutId={`exp-${area.id}-${id}`}
        className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs text-center"
        transition={layoutTransition}
      >
        {area.experiencia}
      </motion.p>
    </div>
  </motion.div>
));

AreaCard.displayName = 'AreaCard';

// Componente del modal memoizado
const AreaModal = memo(({ 
  active, 
  id, 
  onClose,
  modalRef
}: { 
  active: AreaExperiencia;
  id: string; 
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
}) => (
  <div className="fixed inset-0 z-100 flex items-end sm:items-center sm:justify-center">
    <motion.div
      layoutId={`card-${active.id}-${id}`}
      ref={modalRef}
      className="w-full sm:max-w-[500px] max-h-[85vh] sm:max-h-[90%] flex flex-col bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl overflow-hidden will-change-transform shadow-2xl"
      style={{ transform: "translateZ(0)" }}
      transition={layoutTransition}
    >
      {/* Header con icono y gradiente */}
      <motion.div 
        layoutId={`image-${active.id}-${id}`}
        transition={layoutTransition}
        className="relative shrink-0"
      >
        {/* Indicador de arrastre para móvil */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/40 rounded-full sm:hidden" />
        
        <div className={`w-full h-24 sm:h-40 flex items-center justify-center bg-linear-to-br ${active.color}`}>
          <active.Icono className="size-10 sm:size-16 text-white" />
        </div>
        
        {/* Botón cerrar flotante en móvil */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15, delay: 0.1 }}
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm sm:hidden"
        >
          <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Título y experiencia */}
        <div className="flex justify-between items-start p-4 sm:p-5 sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="flex-1">
            <motion.h3
              layoutId={`title-${active.id}-${id}`}
              className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl"
              transition={layoutTransition}
            >
              {active.titulo}
            </motion.h3>
            <motion.p
              layoutId={`exp-${active.id}-${id}`}
              className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium"
              transition={layoutTransition}
            >
              {active.experiencia} de experiencia
            </motion.p>
          </div>

          {/* Botón cerrar en desktop */}
          <button
            onClick={onClose}
            className="hidden sm:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="size-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Descripción y tecnologías */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, delay: 0.1 }}
          className="p-4 sm:p-5 space-y-4"
        >
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{active.descripcion}</p>

          <div className="w-full">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">Tecnologías y Nivel</h4>
            <div className="space-y-2.5">
              {active.tecnologias.map((tech) => (
                <div key={tech.nombre} className="space-y-1">
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
        </motion.div>
      </div>

      {/* Safe area para dispositivos con notch/home indicator */}
      <div className="h-safe-area-inset-bottom sm:hidden" />
    </motion.div>
  </div>
));

AreaModal.displayName = 'AreaModal';

export const AreasDeExperiencia = () => {
  const [active, setActive] = useState<AreaExperiencia | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setActive(null), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, handleClose);

  return (
    <LayoutGroup>
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

        {/* Overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 h-full w-full z-10"
              style={{ willChange: "opacity" }}
            />
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence mode="wait">
          {active && (
            <AreaModal 
              active={active} 
              id={id} 
              onClose={handleClose}
              modalRef={ref}
            />
          )}
        </AnimatePresence>

        {/* Grid de tarjetas compacto */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {areasExperiencia.map((area) => (
            <AreaCard
              key={area.id}
              area={area}
              id={id}
              onClick={() => setActive(area)}
            />
          ))}
        </div>
      </div>
    </LayoutGroup>
  )
}

export default AreasDeExperiencia;