import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

export default function Footer({ theme }) {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 md:px-8 border-t border-neutral-200/40 dark:border-neutral-800/40 bg-white dark:bg-darkBg transition-colors duration-300">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo / Branding */}
        <a href="#home" onClick={handleLogoClick} className="flex items-center gap-2 group">
          <img
            src={theme === 'dark' ? logoLight : logoDark}
            alt="Gradix Technologies"
            className="h-6 w-auto object-contain transition-opacity duration-300"
          />
        </a>

        {/* Info & Legal Copyright */}
        <p className="text-[11px] text-neutral-450 dark:text-neutral-500 font-semibold tracking-wider uppercase font-mono">
          &copy; {currentYear} Gradix Technologies. All Rights Reserved.
        </p>


      </div>
    </footer>
  );
}
