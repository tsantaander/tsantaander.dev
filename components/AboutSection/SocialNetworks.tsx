import {
    TbBrandGithub,
    TbBrandInstagram,
    TbBrandLinkedin,
    TbMail,
  } from "react-icons/tb";
  import Link from "next/link"
  import { motion } from "framer-motion"


export const SocialNetworks = () => {
    const networks = [
      {
        name: "Github",
        icon: TbBrandGithub,
        href: "https://github.com/tsantaander",
        color: "hover:bg-linear-to-br hover:from-purple-500 hover:to-purple-700",
        bgColor: "bg-slate-100 dark:bg-slate-800",
      },
      {
        name: "Linkedin",
        icon: TbBrandLinkedin,
        href: "https://www.linkedin.com/in/tomas-santander/",
        color: "hover:bg-linear-to-br hover:from-blue-500 hover:to-blue-700",
        bgColor: "bg-slate-100 dark:bg-slate-800",
      },
      {
        name: "Email",
        icon: TbMail,
        href: "x.santander.soto@outlook.cl",
        color: "hover:bg-linear-to-br hover:from-rose-500 hover:to-rose-700",
        bgColor: "bg-slate-100 dark:bg-slate-800",
      },
      {
        name: "Instagram",
        icon: TbBrandInstagram,
        href: "https://www.instagram.com/tegmasolutions/",
        color: "hover:bg-linear-to-br hover:from-pink-500 hover:to-pink-700",
        bgColor: "bg-slate-100 dark:bg-slate-800",
      },
    ]
    return (
      <div className="relative z-20">
        <div className="flex flex-wrap items-center gap-3">
          {networks.map((network) => (
            <motion.div 
              key={network.name}
              whileHover={{ 
                scale: 1.1,
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Link
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${network.bgColor} p-3 rounded-xl hover:text-white ${network.color} inline-flex items-center justify-center transition-all duration-300 text-slate-600 dark:text-slate-400 shadow-sm hover:shadow-md`}
                aria-label={network.name}
              >
                <network.icon className="size-5 sm:size-6" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }