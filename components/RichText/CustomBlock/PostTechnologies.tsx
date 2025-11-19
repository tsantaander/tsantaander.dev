"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Nextjs,
  ReactDark,
  ShadcnUiDark,
  TypeScript,
  Supabase,
  TanStack,
  PostgreSQL,
  TailwindCSS,
  Git,
  GraphQL,
  Python,
  MongoDB,
  Docker
} from "@ridemountainpig/svgl-react";
import LogoSisa from "@/public/images/imagotipo_sisa.png";

// Mapa de tecnologías disponibles
const technologyComponents: Record<string, React.ReactNode> = {
  nextjs: <Nextjs />,
  react: <ReactDark />,
  shadcn: <ShadcnUiDark />,
  typescript: <TypeScript />,
  supabase: <Supabase />,
  tanstack: <TanStack />,
  postgresql: <PostgreSQL />,
  tailwind: <TailwindCSS />,
  git: <Git />,
  graphql: <GraphQL />,
  python: <Python />,
  mongodb: <MongoDB />,
  docker: <Docker />,
};

// Wrapper para iconos con estilo glassmorphism
const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
}) => (
  <div
    className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300
        ${isHighlighted
        ? "dark:bg-gray-700/50 bg-gray-100/80 border border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
        : `dark:bg-white/5 bg-white/60 border border-gray-200/50 dark:border-white/10 ${!isHovered && "animate-float"}`
      }
        ${isHovered
        ? "dark:bg-gray-600/50 bg-gray-200/80 border-blue-400/60 scale-110 dark:shadow-blue-400/30 shadow-blue-400/40 shadow-2xl"
        : "dark:hover:bg-white/10 hover:bg-gray-100/80 dark:hover:border-white/20 hover:border-gray-300/60"
      }
        ${className}
    `}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

interface Technology {
  technology: string;
  id?: string;
}

interface IconGridProps {
  technologies: Technology[];
  centerIcon?: string;
}

// Grid de iconos con animaciones y líneas conectoras
const IconGrid: React.FC<IconGridProps> = ({ technologies, centerIcon = 'custom' }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Limitar a máximo 7 tecnologías
  const outerIcons = technologies.slice(0, 7).map((tech, index) => ({
    id: index + 1,
    component: technologyComponents[tech.technology] || <div className="w-12 h-12" />,
  }));

  // Constantes para cálculo del layout
  const radius = 160;
  const centralIconRadius = 48; // w-24 is 96px, radius is 48px
  const outerIconRadius = 40; // w-20 is 80px, radius is 40px
  const svgSize = 380;
  const svgCenter = svgSize / 2;


  // Componente para el icono central
  const getCenterIcon = () => {
    if (centerIcon === 'custom') {
      return <Image src={LogoSisa} alt="Logo" className="w-full h-full object-contain rounded-full" />;
    }
    return technologyComponents[centerIcon] || <div className="size-12" />;
  };

  return (
    <div className="relative w-[380px] h-[380px] scale-75 md:scale-100">
      {/* SVG con líneas conectoras */}
      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
        <g>
          {outerIcons.map((icon, i) => {
            const angleInDegrees = -150 + i * 60;
            const angleInRadians = angleInDegrees * (Math.PI / 180);

            const startX =
              svgCenter + centralIconRadius * Math.cos(angleInRadians);
            const startY =
              svgCenter + centralIconRadius * Math.sin(angleInRadians);
            const endX =
              svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
            const endY =
              svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);

            return (
              <line
                key={`line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={hoveredId === icon.id ? "#3B82F6" : "#6B7280"}
                strokeWidth="2"
                className="transition-all duration-300 dark:stroke-gray-600"
                style={{
                  opacity: hoveredId === icon.id ? 1 : 0.3,
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Contenedor principal */}
      <div className="absolute top-1/2 left-1/2">
        {/* Icono Central */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper className="size-24" isHighlighted={true} animationDelay={0}>
            {getCenterIcon()}
          </IconWrapper>
        </div>

        {/* Iconos exteriores */}
        {outerIcons.map((icon, i) => {
          const angleInDegrees = -150 + i * 60;
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          const iconStyle = {
            transform: `translate(${x}px, ${y}px)`,
          };

          return (
            <div
              key={icon.id}
              className="absolute z-10"
              style={iconStyle}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <IconWrapper
                  className="size-20 p-4"
                  isHovered={hoveredId === icon.id}
                  animationDelay={i * 0.2}
                >
                  {icon.component}
                </IconWrapper>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente principal adaptado para RichText
interface PostTechnologiesBlockProps {
  title?: string;
  showTitle?: boolean;
  technologies: Technology[];
  centerIcon?: string;
}

export default function PostTechnologiesBlock({
  title,
  showTitle = true,
  technologies = [],
  centerIcon = 'custom',
}: PostTechnologiesBlockProps) {
  return (
    <div className="w-full my-8">
      <style>
        {`
          @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
          }
          .animate-float {
              animation: float 4s ease-in-out infinite;
          }

          @keyframes breathing-glow {
              0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
              50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); }
              100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
          }
          @keyframes breathing-glow-light {
              0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
              50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); }
              100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
          }
          .animate-breathing-glow {
              animation: breathing-glow 3s ease-in-out infinite;
          }
          .dark .animate-breathing-glow {
              animation: breathing-glow 3s ease-in-out infinite;
          }
          :not(.dark) .animate-breathing-glow {
              animation: breathing-glow-light 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Título opcional */}
      {showTitle && title && (
        <h3 className="text-2xl font-bold text-center mb-8">{title}</h3>
      )}

      {/* Background con gradiente radial */}
      <div className="relative w-full flex items-center justify-center font-sans p-8 overflow-hidden">
        <div className="relative z-10 container mx-auto flex items-center justify-center">
          <IconGrid technologies={technologies} centerIcon={centerIcon} />
        </div>
      </div>
    </div>
  );
}
