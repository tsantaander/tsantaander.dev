import {
    TbBrandGithub,
    TbBrandInstagram,
    TbBrandLinkedin,
    TbMail,
  } from "react-icons/tb";
  import Link from "next/link"


export const SocialNetworks = () => {
    const networks = [
      {
        name: "Github",
        icon: TbBrandGithub,
        href: "https://github.com/tsantaander",
        color: "hover:bg-gradient-to-br from-purple-400 to-purple-800",
      },
      {
        name: "Linkedin",
        icon: TbBrandLinkedin,
        href: "https://www.linkedin.com/in/tomas-santander/",
        color: "hover:bg-gradient-to-br from-blue-400 to-blue-800",
      },
      {
        name: "Email",
        icon: TbMail,
        href: "x.santander.soto@outlook.cl",
        color: "hover:bg-gradient-to-br from-rose-400 to-rose-800",
      },
      {
        name: "Instagram",
        icon: TbBrandInstagram,
        href: "https://www.instagram.com/tsantaander/",
        color: "hover:bg-gradient-to-br from-pink-400 to-pink-800",
      },
    ]
    return (
      <div className="relative z-20 mt-4 sm:mt-0">
        <div className="flex flex-wrap items-center gap-3">
          {networks.map((network) => (
            <Link
              key={network.name}
              href={network.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-gray-600 hover:border-none p-2 rounded-xl sm:rounded-2xl ${network.color} transition-all hover:duration-500 hover:scale-125`}
            >
              <network.icon className="size-5 sm:size-6 md:size-7 lg:size-8 hover:text-white" />
            </Link>
          ))}
        </div>
      </div>
    )
  }