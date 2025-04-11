import clsx from 'clsx';
import { SparklesIcon, HeartIcon, CodeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

interface FeaturedCardProps {
  icon: ReactElement;
  title: string;
  desc: string;
}

function FeaturedCard({ icon, title, desc }: FeaturedCardProps) {
  return (
    <div
      className={clsx(
        'border-divider-light relative z-10 flex-1 rounded-2xl border bg-white',
        'dark:border-divider-dark dark:bg-slate-900'
      )}
    >
      <div
        className={clsx(
          'border-divider-light absolute inset-x-0 inset-y-8 z-[-1] border-t',
          'dark:border-divider-dark'
        )}
      />
      <div
        className={clsx(
          'border-divider-light absolute inset-x-8 inset-y-0 z-[-1] border-l',
          'dark:border-divider-dark'
        )}
      />
      <div className={clsx('-mt-0.5')}>
        <div
          className={clsx(
            'ml-4 mr-2 mt-4 flex items-center gap-6 rounded-full bg-slate-100',
            'dark:bg-slate-800'
          )}
        >
          <div className={clsx('-m-2')}>{icon}</div>
          <div
            className={clsx(
              'truncate py-2 pr-4 text-sm font-bold text-slate-700 select-none',
              'dark:text-slate-300'
            )}
          >
            {title}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'p-4 pl-12 text-sm text-slate-600 select-none',
          'dark:text-slate-400'
        )}
      >
        {desc}
      </div>
    </div>
  );
}


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