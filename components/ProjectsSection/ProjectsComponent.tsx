"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ExternalLink, Github, Code2, Palette, Database, Zap, LucideIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { Badge } from '@/components/ui/badge'
import DotGrid from '@/components/ui/dotgrid'
import { useResponsive } from '@/context/ResponsiveContext'

// Tipos TypeScript
interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  type: 'FullStack' | 'Frontend' | 'Backend'
  category: 'Personales' | 'Clientes' | 'Tegma Solutions' | 'Open Source'
  githubUrl: string
  liveUrl: string
  featured: boolean
}

type TypesFilter = 'Todos' | 'Personales' | 'Clientes' | 'Tegma Solutions' | 'Open Source'


interface ProjectCardProps {
  project: Project
  index: number
  isVisible: boolean
}

// Datos de ejemplo para los proyectos
const projectsData: Project[] = [
  {
    id: 1,
    title: "ProdMentorAI",
    description: "Agente de Inteligencia Artificial conversacional que busca Optimizar el rendimiento de ventas en tiendas minoristas (físicas o con componente presencial) actuando como un mentor virtual experto para el personal de ventas. ",
    image: "/images/prodmentor.png",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "OpenAI", "PostgreSQL", "Docker", "LangGraph", "LangChain"],
    type: "Frontend",
    category: "Tegma Solutions",
    githubUrl: "https://github.com/tegmasolutions/",
    liveUrl: "https://prodmentorai.vercel.app",
    featured: true
  },
  {
    id: 2,
    title: "Clouding Drive",
    description: "Plataforma de nube que busca centralizar la información a nivel de organizaciones.",
    image: "/images/cloudingdrive.png",
    technologies: ["Next.js", "TypeScript", "FastAPI", "Python", "MongoDB", "Docker", "Nginx", "Tailwind CSS"],
    type: "FullStack",
    category: "Open Source",
    githubUrl: "https://github.com/diegitfk/cloud_proyect",
    liveUrl: "https://",
    featured: false
  },
  {
    id: 3,
    title: "AiHire",
    description: "App Full Stack para practicar entrevistas con IA. Simulaciones personalizadas, retroalimentación en tiempo real sobre habilidades técnicas y comunicativas. Ideal para candidatos y reclutadores.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["React", "D3.js", "FastAPI", "PostgreSQL", "Redis"],
    type: "FullStack",
    category: "Personales",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false
  },
  {
    id: 4,
    title: "SmartWatt",
    description: "Aplicación móvil de métricas de energía en un hogar, comunicandose con un circuito manejado con Arduino ",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    technologies: ["Kotlin", "Python", "Arduino", "Sintaxis C/C++", "Firebase"],
    type: "FullStack",
    category: "Open Source",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: 5,
    title: "SISA Médica",
    description: "Aplicación web ",
    image: "/images/sisamedica.png",
    technologies: ["Vue.js", "Node.js", "OpenWeather API", "Charts.js"],
    type: "FullStack",
    category: "Clientes",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: 6,
    title: "CCTV Monitor",
    description: "Plataforma de seguimiento de criptomonedas con análisis técnico, alertas de precios y portfolio personal.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
    technologies: ["React", "Python", "CoinGecko API", "Chart.js", "PostgreSQL"],
    type: "FullStack",
    category: "Personales",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false
  }
]

const typesIcons: Record<Project['type'], LucideIcon> = {
  FullStack: Code2,
  Frontend: Palette,
  Backend: Database
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const { isMobile } = useResponsive()
  
  const TypeIcon = typesIcons[project.type]

  const handleMouseEnter = (): void => {
    setIsHovered(true)
  }

  const handleMouseLeave = (): void => {
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`group relative h-full ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contenedor principal con efecto glassmorphism */}
      <div className="relative h-full bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">

      {!isMobile && <GlowingEffect
            blur={0}
            borderWidth={3}
            spread={80}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />}
        

        {/* Imagen del proyecto */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Badge de categoría */}
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: (index * 0.1) + 0.3 }}
          >
            <TypeIcon className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">{project.type}</span>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: (index * 0.1) + 0.4, type: "spring", stiffness: 300 }}
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
          )}

          {/* Botones de acción */}
          <motion.div
            className="absolute bottom-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500/80 backdrop-blur-sm hover:bg-blue-500 p-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Contenido del proyecto */}
        <div className="p-6 space-y-4">
          <motion.h3
            className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: (index * 0.1) + 0.2 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: (index * 0.1) + 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Tecnologías */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: (index * 0.1) + 0.4 }}
          >
            {project.technologies.map((tech: string, techIndex: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  delay: (index * 0.1) + 0.5 + (techIndex * 0.05),
                  type: "spring",
                  stiffness: 300
                }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-gray-200/50 dark:bg-gray-700/50 hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Efecto de partículas en hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  initial={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: 0
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<TypesFilter>('Todos')
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(sectionRef, { once: true, amount: 'some' })

  const types: TypesFilter[] = ['Todos', 'Personales', 'Clientes', 'Tegma Solutions', 'Open Source']
  
  const filteredProjects: Project[] = filter === 'Todos' 
    ? projectsData 
    : projectsData.filter((project: Project) => project.category === filter)

  const handleFilterChange = (type: TypesFilter): void => {
    setFilter(type)
  }

  return (
    <section id="projects" className="relative min-h-screen py-20">
      {/* Fondo interactivo con DotGrid */}
      <div className="absolute inset-0 -z-10">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="#d1d5db"
          darkBaseColor="#374151"
          activeColor="#3b82f6"
          proximity={120}
          shockRadius={200}
          shockStrength={0.8}
          resistance={400}
          returnDuration={1.2}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8" ref={sectionRef}>
        {/* Header de la sección */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 via-blue-800 to-gray-900 dark:from-blue-700 dark:via-blue-500 dark:to-blue-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Proyectos Destacados
          </motion.h2>
          <div className="bg-gradient-to-br from-blue-600 via-blue-400 to-purple-600 max-w-sm h-1 mx-auto rounded-full mb-4" />
          
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Una selección de mis trabajos más recientes, donde combino creatividad, 
            tecnología y funcionalidad para crear soluciones digitales innovadoras
          </motion.p>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {types.map((type: TypesFilter, index: number) => (
            <motion.button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === type
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-blue-600/10 hover:border-blue-600/30'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de proyectos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project: Project, index: number) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Colaboremos para convertir tus ideas en realidad digital
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Conversación
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection