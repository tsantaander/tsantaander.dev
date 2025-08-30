"use client"
import React, { useState, useEffect, useId, useRef } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { BsWindowSplit, BsX } from "react-icons/bs"
import { LuServerCog } from "react-icons/lu"
import DevOpsIcon from "@/public/icons/devops.svg"
import { useOutsideClick } from "@/hooks/use-outside-click"

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
  proyectosDestacados: string[];
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
      { nombre: 'TypeScript', nivel: 'Avanzado' },
      { nombre: 'Next.js', nivel: 'Intermedio-Avanzado' },
      { nombre: 'Tailwind CSS', nivel: 'Avanzado' },
      { nombre: 'Redux', nivel: 'Intermedio' },
    ],
    proyectosDestacados: [
      'Aplicación de gestión de tareas con React y Firebase',
      'E-commerce con Next.js y Stripe',
      'Dashboard administrativo con Material-UI'
    ],
    experiencia: '3+ años'
  },
  {
    id: 'backend',
    titulo: 'BackEnd',
    descripcion: 'Construyendo APIs robustas y sistemas escalables con las mejores prácticas de desarrollo.',
    icono: <LuServerCog className="size-8 mb-2" />,
    tecnologias: [
      { nombre: 'Node.js', nivel: 'Avanzado' },
      { nombre: 'Express', nivel: 'Intermedio-Avanzado' },
      { nombre: 'MongoDB', nivel: 'Intermedio' },
      { nombre: 'PostgreSQL', nivel: 'Intermedio' },
      { nombre: 'GraphQL', nivel: 'Intermedio' },
    ],
    proyectosDestacados: [
      'API REST para aplicación de gestión de contenidos',
      'Microservicios con Node.js y Docker',
      'Sistema de autenticación JWT'
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
      { nombre: 'AWS', nivel: 'Básico' },
      { nombre: 'CI/CD', nivel: 'Intermedio' },
      { nombre: 'Nginx', nivel: 'Básico' },
    ],
    proyectosDestacados: [
      'Configuración de pipelines CI/CD',
      'Dockerización de aplicaciones',
      'Automatización de despliegues'
    ],
    experiencia: '1+ año'
  }
];

export const AreasDeExperiencia = () => {
  const { theme } = useTheme();
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

      {/* Overlay */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.titulo}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
            </motion.button>

            <motion.div
              layoutId={`card-${active.titulo}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* Imagen/Icono placeholder */}
              <motion.div
                layoutId={`image-${active.titulo}-${id}`}
                className={`w-full h-36 sm:rounded-tr-lg sm:rounded-tl-lg flex items-center justify-center bg-gradient-to-br from-blue-700 to-black transition-colors duration-300`}
              >
                {React.cloneElement(active.icono, {
                  className: "size-24 opacity-80"
                })}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.titulo}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.titulo}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.descripcion}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
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
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Cerrar
                  </motion.button>
                </div>

                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <div className="w-full">
                      <p className="mb-4">{active.descripcion}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-neutral-700 dark:text-neutral-200">Tecnologías</h4>
                          <div className="space-y-2">
                            {active.tecnologias.map((tech, index) => (
                              <div key={index} className="flex justify-between">
                                <span>{tech.nombre}</span>
                                <span className="text-neutral-500">{tech.nivel}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-neutral-700 dark:text-neutral-200">Proyectos Destacados</h4>
                          <ul className="space-y-1">
                            {active.proyectosDestacados.map((proyecto, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                <span>{proyecto}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Grid de tarjetas */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-center">
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
              className={`h-24 w-full gap-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-300 dark:bg-gradient-to-br dark:from-blue-600/55 dark:to-black/55 transition-colors duration-300`}
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