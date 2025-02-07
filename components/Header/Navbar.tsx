import Link from 'next/link';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-white transition-colors px-4 py-2"
  >
    {children}
  </Link>
);

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full py-6 px-4 bg-[#1E1A78]">
      <div className="max-w-5xl mx-auto">
        <nav className="bg-[#D9D9DE]/20 backdrop-blur-xl rounded-2xl">
          <div className="px-6">
            <div className="flex items-center justify-between h-12">
              {/* Sección de nombre */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-white font-medium">
                  Tomás Santander
                </Link>
              </div>

              {/* Links de navegación */}
              <div className="hidden md:flex items-center space-x-5 font-semibold">
                <NavLink href="/about">Acerca de mi</NavLink>
                <NavLink href="/projects">Proyectos</NavLink>
                <NavLink href="/articles">Artículos</NavLink>
                {/* Botón de cambio de tema */}
                <Button
                  className="rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 transition-colors"
                  aria-label="Toggle theme"
                >
                  <Sun className="h-8 w-8 text-gray-300" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;