import clsx from 'clsx';
import FeaturedCard from "./FeatureCard";
import { SparklesIcon, HeartIcon, CodeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeaturedCardSection() {
  return (
    <>
      <div className="relative flex h-[20rem] w-full items-center justify-center bg-white dark:bg-[#0A0A0A]">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#0A0A0A]"></div>
        <div className={clsx('flex mx-auto sm:px-12 md:px-10 lg:px-16 xl:px-6')}>
          <div className={clsx('flex flex-col gap-4', 'lg:flex-row lg:gap-8')}>
            <FeaturedCard
              icon={
                <div
                  className={clsx(
                    'rounded-full bg-amber-300 p-3.5',
                  )}
                >
                  <SparklesIcon className={clsx('h-5 w-5 text-white')} />
                </div>
              }
              title="Limpio e Intuitivo"
              desc="Mantenga la interfaz de usuario limpia con un toque moderno sin comprometer la experiencia de usuario."
            />
            <FeaturedCard
              icon={
                <div
                  className={clsx(
                    'rounded-full bg-pink-300 p-3.5',
                    'dark:bg-pink-900'
                  )}
                >
                  <HeartIcon className={clsx('h-5 w-5 text-white')} />
                </div>
              }
              title="Orientado al detalle"
              desc="Cada detalle cuenta, por lo que me aseguro de que cada pixel sea perfecto y se ajuste a su diseño."
            />
            <FeaturedCard
              icon={
                <div
                  className={clsx(
                    'rounded-full bg-sky-300 p-3.5',
                    'dark:bg-sky-900'
                  )}
                >
                  <CodeIcon className={clsx('h-5 w-5 text-white')} />
                </div>
              }
              title="Enfoque en la optimización"
              desc="Escribir codigo limpio es mi prioridad, para dar una experiencia de usuario rápida y optimizada."
            />
          </div>
        </div>
      </div>
    </>
  )
}