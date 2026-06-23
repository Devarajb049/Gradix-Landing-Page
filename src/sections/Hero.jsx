import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { HiSearch, HiSparkles } from 'react-icons/hi';
import { HiEnvelope, HiOutlineBookOpen, HiOutlineChevronRight } from 'react-icons/hi2';
import Magnetic from '../components/Magnetic';
import RoundedSlideButton from '../components/RoundedSlideButton';

gsap.registerPlugin();

export default function Hero() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const inputRef = useRef(null);
  const browserRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Welcome');
  const [emailText, setEmailText] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subHeadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.7'
      )
      .fromTo(
        inputRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        '-=0.5'
      )
      .fromTo(
        browserRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.6'
      );
  }, { scope: containerRef });

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!emailText) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailText('');
      setSubscribed(false);
      const contactSec = document.querySelector('#contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-24 px-6 md:px-8 bg-transparent"
    >

      {/* Premium Cyber Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-primary-500/10 dark:bg-primary-500/15 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-400/5 dark:bg-cyan-400/10 blur-[100px] animate-pulse-slow" />

        {/* CSS grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(0,102,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,102,255,0.05)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-35 dark:opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Intersection Dot Markers */}
        <div className="absolute top-[9rem] left-[50%] -translate-x-[18rem] h-1.5 w-1.5 rounded-full bg-primary-500/40 dark:bg-primary-500/60" />
        <div className="absolute top-[13.5rem] left-[50%] translate-x-[18rem] h-1.5 w-1.5 rounded-full bg-cyan-400/45 dark:bg-cyan-400/70 animate-ping" />
        <div className="absolute top-[22.5rem] left-[50%] -translate-x-[9rem] h-1.5 w-1.5 rounded-full bg-primary-500/40 dark:bg-primary-400/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full text-center flex flex-col items-center">
        {/* Main Central Heading */}
        <div ref={headingRef} className="overflow-hidden">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-neutral-900 dark:text-white max-w-4xl">
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-400 bg-clip-text text-transparent">
              Accelerate
            </span>{' '}Your Business Growth with{' '}
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-400 bg-clip-text text-transparent">
              Gradix Technologies
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subHeadingRef}
          className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-450 max-w-2xl font-medium leading-relaxed"
        >
          Gradix Technologies helps startups and businesses grow through reliable digital solutions, modern design, and performance-focused strategies.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--btn-border-radius)] bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary-500/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
            <HiOutlineChevronRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            onClick={(e) => handleAnchorClick(e, '#services')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--btn-border-radius)] border border-neutral-300 dark:border-neutral-700 text-sm font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:-translate-y-0.5"
          >
            Our Services
          </a>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-10">
        <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-450 dark:text-neutral-500 mb-2">Scroll Down</span>
          <div className="h-9 w-5 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex justify-center p-1.5">
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-primary-400"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
