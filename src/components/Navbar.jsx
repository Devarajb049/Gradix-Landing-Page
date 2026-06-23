import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSun, HiMoon } from 'react-icons/hi';
import Magnetic from './Magnetic';
import SpringModal from './SpringModal';
import RoundedSlideButton from './RoundedSlideButton';

import logoLight from '../assets/logo-light.png';
import logoDark from '../assets/logo-dark.png';

const navItems = [
  { name: 'Home', href: '#home', key: 'home' },
  { name: 'Clients', href: '#clients', key: 'clients' },
  { name: 'About', href: '#about', key: 'about' },
  { name: 'Services', href: '#services', key: 'services' },
  { name: 'Projects', href: '#projects', key: 'projects' },
  { name: 'Process', href: '#process', key: 'process' },
  { name: 'Testimonials', href: '#testimonials', key: 'testimonials' },
  { name: 'Contact', href: '#contact', key: 'contact' },
];


export default function Navbar({ theme, setTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // SlideTabs States
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [isHoveredMenu, setIsHoveredMenu] = useState(false);

  const tabRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active Section detector
      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].href.substring(1));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync cursor position with the active section when NOT hovering
  useEffect(() => {
    if (!isHoveredMenu) {
      const activeTab = tabRefs.current[activeSection];
      if (activeTab) {
        const { width } = activeTab.getBoundingClientRect();
        setPosition({
          left: activeTab.offsetLeft,
          width,
          opacity: 1,
        });
      } else {
        setPosition(prev => ({ ...prev, opacity: 0 }));
      }
    }
  }, [activeSection, isHoveredMenu]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Offset slightly to account for floating navbar
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-40 mx-auto max-w-7xl px-4 md:px-8">
        <div
          className={`w-full rounded-full border border-neutral-200/40 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md px-6 py-2.5 flex items-center justify-between shadow-lg transition-all duration-300 ${scrolled ? 'shadow-xl' : ''
            }`}
        >
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
            <img
              src={theme === 'dark' ? logoLight : logoDark}
              alt="Gradix Technologies"
              className="h-6 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Items - SlideTabs */}
          <nav className="hidden md:block">
            <ul
              onMouseLeave={() => setIsHoveredMenu(false)}
              onMouseEnter={() => setIsHoveredMenu(true)}
              className="relative flex items-center p-0.5 rounded-full"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li
                    key={item.key}
                    ref={(el) => (tabRefs.current[item.href.substring(1)] = el)}
                    onMouseEnter={() => {
                      const tabEl = tabRefs.current[item.href.substring(1)];
                      if (tabEl) {
                        const { width } = tabEl.getBoundingClientRect();
                        setPosition({
                          left: tabEl.offsetLeft,
                          width,
                          opacity: 1,
                        });
                      }
                    }}
                    className="relative z-10 block"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block cursor-pointer px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${isActive
                          ? 'text-white dark:text-white'
                          : 'text-neutral-600 dark:text-neutral-300 hover:text-white dark:hover:text-white'
                        }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}

              {/* Slide Tabs Cursor */}
              <motion.li
                animate={{
                  left: position.left,
                  width: position.width,
                  opacity: position.opacity,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="absolute z-0 h-[28px] rounded-full bg-primary-500"
              />
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Fancy Dark Mode Toggle */}
            <div
              onClick={toggleTheme}
              className="relative flex h-8 w-[64px] items-center justify-between rounded-full border border-neutral-200/50 dark:border-neutral-800/50 bg-neutral-100 dark:bg-neutral-900/60 p-1 cursor-pointer select-none transition-colors"
            >
              <HiSun className="h-3.5 w-3.5 ml-1 text-neutral-400 dark:text-neutral-600" />
              <HiMoon className="h-3.5 w-3.5 mr-1 text-neutral-600 dark:text-neutral-400" />
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                animate={{
                  x: theme === 'dark' ? 28 : 0,
                }}
                className="absolute h-6 w-6 rounded-full bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center text-amber-500 dark:text-cyan-400 border border-neutral-200/20 dark:border-neutral-700/20"
              >
                {theme === 'dark' ? <HiMoon className="h-3 w-3" /> : <HiSun className="h-3 w-3" />}
              </motion.div>
            </div>

            {/* CTA using RoundedSlideButton */}
            <RoundedSlideButton
              variant="secondary"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 text-[10px] uppercase tracking-wider"
            >
              Get in Touch
            </RoundedSlideButton>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-3">
            {/* Theme switcher for mobile */}
            <div
              onClick={toggleTheme}
              className="relative flex h-7 w-[52px] items-center justify-between rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/60 p-0.5 cursor-pointer"
            >
              <HiSun className="h-3 w-3 ml-1 text-neutral-400" />
              <HiMoon className="h-3 w-3 mr-1 text-neutral-500" />
              <motion.div
                layout
                animate={{
                  x: theme === 'dark' ? 22 : 0,
                }}
                className="absolute h-5 w-5 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-amber-500 dark:text-cyan-400"
              >
                {theme === 'dark' ? <HiMoon className="h-2.5 w-2.5" /> : <HiSun className="h-2.5 w-2.5" />}
              </motion.div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <HiX className="h-4.5 w-4.5" /> : <HiMenuAlt3 className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-30 md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border border-neutral-200 dark:border-neutral-800 shadow-2xl rounded-2xl max-h-[80vh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-3 p-6">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-full transition-colors ${isActive
                        ? 'bg-neutral-100 dark:bg-neutral-900 text-primary-500 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                      }`}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.04 }}
                className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800"
              >
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full rounded-full bg-primary-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg flex items-center justify-center"
                >
                  Get in Touch
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spring Modal Popup */}
      <SpringModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
