"use client"
import React, { useState, useEffect, useId, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { BsWindowSplit } from "react-icons/bs"
import { LuServerCog } from "react-icons/lu"
import DevOpsIcon from "@/public/icons/devops.svg"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { Progress } from "@/components/ui/progress"

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
  icono: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  tecnologias: AreaTecnologia[];
  experiencia: string;
}

const areasExperiencia: AreaExperiencia[] = [
  {
    id: 'frontend',
    titulo: 'FrontEnd',
    descripcion: 'Creando soluciones mantenibles y elegantes con las últimas tecnologías del ecosistema web moderno.',
    icono: <BsWindowSplit className="size-8 mb-2" />,
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
    icono: <LuServerCog className="size-8 mb-2" />,
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
    icono: <DevOpsIcon className="size-8 mb-2" />,
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
    titulo: 'Otros Conocimientos',
    descripcion: 'Utilizando herramientas modernas para mejorar la eficiencia y productividad.',
    icono: <DevOpsIcon className="size-8 mb-2" />,
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
    icono: <DevOpsIcon className="size-8 mb-2" />,
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
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

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

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center w-full py-2">
        <h1 className="text-3xl font-bold text-center">
          Áreas de Experiencia
        </h1>
      </div>

      {/* Portal para Overlay y Modal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {active && typeof active === "object" && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />

              {/* Modal */}
              <div className="fixed inset-0 grid place-items-center z-[100] px-6 sm:px-0">
                <motion.div
                  layoutId={`card-${active.titulo}-${id}`}
                  ref={ref}
                  className="w-full max-w-[600px] max-h-[70%] md:h-fit md:max-h-[90%] mx-4 sm:mx-0 flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl shadow-2xl"
                >
                  {/* Imagen/Icono placeholder */}
                  <motion.div
                    layoutId={`image-${active.titulo}-${id}`}
                    className={`w-full h-28 sm:h-36 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-center bg-linear-to-br from-blue-700 to-black transition-colors duration-300`}
                  >
                    {React.cloneElement(active.icono, {
                      className: "size-16 sm:size-24 opacity-80"
                    })}
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start py-3 sm:py-4 px-4 sm:px-6">
                      <div className="flex-1 pr-2">
                        <motion.h3
                          layoutId={`title-${active.titulo}-${id}`}
                          className="font-medium text-neutral-700 dark:text-neutral-200 text-lg sm:text-xl"
                        >
                          {active.titulo}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${active.descripcion}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base"
                        >
                          {active.experiencia} de experiencia
                        </motion.p>
                      </div>

                      <motion.button
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActive(null)}
                        className="hidden sm:flex px-4 py-2 text-sm rounded-full font-bold bg-green-500 hover:bg-green-600 text-white transition-colors"
                      >
                        Cerrar
                      </motion.button>
                    </div>

                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 text-sm sm:text-base flex flex-col items-start gap-4 dark:text-neutral-400"
                      >
                        <div className="w-full">
                          <p className="mb-4 sm:mb-6">{active.descripcion}</p>

                          <div className="flex flex-col mx-auto w-full items-center justify-center">
                            <h4 className="font-semibold mb-3 sm:mb-4 text-neutral-700 dark:text-neutral-200 text-base sm:text-lg">Tecnologías</h4>
                            <div className="space-y-3 sm:space-y-4 w-full">
                              {active.tecnologias.map((tech, index) => (
                                <div key={index} className="space-y-1.5 w-full">
                                  <div className="flex justify-between items-center text-xs sm:text-sm">
                                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{tech.nombre}</span>
                                    <span className="text-xs sm:text-sm font-medium text-neutral-500">{tech.nivel}</span>
                                  </div>
                                  <Progress 
                                    value={nivelAValor(tech.nivel)} 
                                    className="h-2 bg-neutral-200 dark:bg-neutral-800"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Grid de tarjetas */}
      <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-5 items-center">
        {areasExperiencia.map((area) => (
          <motion.div
            layoutId={`card-${area.titulo}-${id}`}
            key={area.id}
            onClick={() => setActive(area)}
            className="p-4 flex flex-col rounded-xl cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              layoutId={`image-${area.titulo}-${id}`}
              className={`h-24 w-full gap-4 rounded-lg flex items-center justify-center bg-linear-to-br from-blue-500 via-blue-600 to-blue-300 dark:bg-gradient-to-br dark:from-blue-600/55 dark:to-black/55 transition-colors duration-300`}
            >
              {React.cloneElement(area.icono, {
                className: "size-14 text-white opacity-90"
              })}

              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${area.titulo}-${id}`}
                  className="font-medium text-neutral-100 text-center md:text-left text-base"
                >
                  {area.titulo}
                </motion.h3>
                <motion.p
                  layoutId={`description-${area.descripcion}-${id}`}
                  className="text-neutral-300 text-center md:text-left text-base"
                >
                  {area.experiencia}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}