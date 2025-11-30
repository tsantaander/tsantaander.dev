"use client"
import React, { useRef } from "react"
import { motion, useInView } from "motion/react"
import { 
  TbBrandGithub, 
  TbBrandLinkedin, 
  TbMail, 
  TbBrandWhatsapp,
  TbWorld
} from "react-icons/tb"
import Link from "next/link"

const contactMethods = [
  {
    name: "LinkedIn",
    icon: TbBrandLinkedin,
    href: "https://www.linkedin.com/in/tomas-santander/",
    color: "hover:text-blue-600 dark:hover:text-blue-400"
  },
  {
    name: "GitHub", 
    icon: TbBrandGithub,
    href: "https://github.com/tsantaander",
    color: "hover:text-purple-600 dark:hover:text-purple-400"
  },
  {
    name: "Email",
    icon: TbMail,
    href: "mailto:x.santander.soto@outlook.cl",
    color: "hover:text-red-600 dark:hover:text-red-400"
  },
  {
    name: "WhatsApp",
    icon: TbBrandWhatsapp,
    href: "https://wa.me/56922248745", // Reemplaza con tu número real
    color: "hover:text-green-600 dark:hover:text-green-400"
  },
  {
    name: "Tegma Solutions",
    icon: TbWorld,
    href: "https://linkstegmasolutions.vercel.app", // Reemplaza con tu URL real
    color: "hover:text-blue-600 dark:hover:text-blue-600"
  }
]

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useInView(sectionRef, { once: true, amount: 0.3 })

  // Variantes de animación consistentes con el proyecto
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="w-full pt-20 pb-20 bg-white"
      style={{
        background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #00187A 100%)"
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Contacto
          </motion.h2>
          <motion.div 
            className="bg-linear-to-r from-blue-700 via-blue-400 to-blue-700 max-w-20 h-1 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            animate={isVisible ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            ¿Tienes un proyecto en mente? Conversemos.
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div 
          className="bg-gray-700/20 dark:bg-slate-700/30 rounded-2xl border backdrop-blur-[2.5px] p-8"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {contactMethods.map((method) => (
              <motion.div
                key={method.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={method.href}
                  target={method.href.startsWith('http') ? "_blank" : "_self"}
                  rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`
                    flex flex-col items-center gap-3 p-4 rounded-xl 
                    transition-all duration-300 
                    hover:bg-white/10 dark:hover:bg-black/20
                    text-gray-700 dark:text-gray-300 ${method.color}
                    group
                  `}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <method.icon className="size-8 group-hover:drop-shadow-lg" />
                  </motion.div>
                  <span className="text-sm font-medium group-hover:font-semibold transition-all">
                    {method.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
