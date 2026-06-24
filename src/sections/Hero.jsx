import { useRef, useState, Fragment } from 'react';
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
  const gridRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Welcome');
  const [emailText, setEmailText] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Grid entrance
    tl.fromTo(
      gridRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }
    );

    // Staggered word animation
    tl.fromTo(
      '.hero-title-word',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' },
      '-=1.2'
    )
      .fromTo(
        subHeadingRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
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

  const titleLines = [
    {
      tokens: [
        { text: "Accelerate", gradient: true },
        { text: "Your Business", gradient: false }
      ],
      highlight: false
    },
    {
      tokens: [
        { text: "Growth with", gradient: false }
      ],
      highlight: false
    },
    {
      tokens: [
        { text: "Gradix Technologies", gradient: false }
      ],
      highlight: true
    }
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden pt-32 pb-24 px-6 md:px-8 bg-transparent"
    >

      {/* Premium Cyber Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
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
        <div ref={headingRef} className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7.5xl font-black tracking-tight leading-[1.28] text-neutral-900 dark:text-white flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 sm:gap-y-3">
            {titleLines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <div className="basis-full h-0" />}
                <span className="inline-block overflow-hidden py-1">
                  <span 
                    className={`hero-title-word inline-block translate-y-[110%] opacity-0 ${
                      line.highlight 
                        ? 'bg-gradient-to-r from-primary-600 via-cyan-500 to-primary-600 animate-gradient-shift text-white px-5 py-1.5 rounded-[1.25rem] shadow-md border border-primary-500/10 dark:border-primary-500/20 select-none' 
                        : ''
                    }`}
                  >
                    {line.tokens.map((token, tIdx) => (
                      <span
                        key={tIdx}
                        className={`${
                          token.gradient && !line.highlight
                            ? 'bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-400 bg-clip-text text-transparent inline-block' 
                            : 'inline-block'
                        } ${tIdx > 0 ? 'ml-[0.25em]' : ''}`}
                      >
                        {token.text}
                      </span>
                    ))}
                  </span>
                </span>
              </Fragment>
            ))}
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
            className="hero-cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-[var(--btn-border-radius)] bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary-500/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
            <HiOutlineChevronRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            onClick={(e) => handleAnchorClick(e, '#services')}
            className="hero-cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-[var(--btn-border-radius)] border border-neutral-300 dark:border-neutral-700 text-sm font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:-translate-y-0.5"
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
