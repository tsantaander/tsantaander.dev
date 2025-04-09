import Link from 'next/link';
import ThemeToggle from '../ui/themeToggle';

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
    <div className="fixed z-50 w-full py-4 px-4">
      <div className="max-w-[1000px] mx-auto">
        <nav className="bg-[#D9D9DE]/20 backdrop-blur-lg rounded-2xl">
          <div className="px-6">
            <div className="flex items-center justify-between h-[55px]">
              {/* Sección de nombre */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-white font-bold text-[16px] tracking-normal">
                  Tomás Santander
                </Link>
              </div>

              {/* Links de navegación */}
              <div className="hidden md:flex mx-auto items-center space-x-5 font-bold text-[16px] tracking-normal">
                <NavLink href="/about">Acerca de mi</NavLink>
                <NavLink href="/projects">Proyectos</NavLink>
                <NavLink href="/articles">Artículos</NavLink>      
              </div>
              <div className='flex items-center'>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;