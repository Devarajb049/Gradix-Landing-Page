import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Components
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import MouseGlow from './components/MouseGlow';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';

// Sections
import Hero from './sections/Hero';
import Clients from './sections/Clients';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Process from './sections/Process';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved || 'light'; // Default to light mode
    }
    return 'light';
  });

  // Theme Sync effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Lenis Smooth Scroll initialization
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // cubic-bezier smooth transition
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-[#fafafa] text-neutral-900 dark:bg-darkBg dark:text-neutral-100 selection:bg-primary-500 selection:text-white transition-colors duration-300">
          {/* Global UI Overlays */}
          <ScrollProgress />
          <Navbar theme={theme} setTheme={setTheme} />
          <MouseGlow />
          <CustomCursor />

          {/* Website Layout Wrapper */}
          <main className="relative z-10 mx-auto max-w-7xl">
            <Hero />
            <Clients />
            <Services />
            <Projects />
            <Process />
            <About />
            <Testimonials />
            <Contact />
            <Footer theme={theme} />
          </main>
        </div>
      )}
    </>
  );
}
