import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

const steps = [
  {
    number: '01',
    title: 'Discovery & Consultation',
    description: 'We understand your business goals, challenges, and requirements to ensure the right solution is planned from the beginning.',
    deliverables: ['Client Alignment', 'Requirement Audit', 'Scope Definition']
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We design a clear roadmap including architecture, features, timelines, and technology choices for smooth execution.',
    deliverables: ['Technical Roadmap', 'Architecture Design', 'Wireframe Blueprints']
  },
  {
    number: '03',
    title: 'Development & Execution',
    description: 'Our team builds and implements your solution using modern technologies with a strong focus on performance and security.',
    deliverables: ['Responsive Build', 'Code Quality Check', 'Security Layer Integration']
  },
  {
    number: '04',
    title: 'Launch, Support & Growth',
    description: 'After launch, we provide continuous support, improvements, and optimizations to help your business scale confidently.',
    deliverables: ['Production Deploy', 'Speed Optimization', 'Scalable Monitoring']
  }
];

export default function Process() {
  const timelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const stepElements = timelineRef.current.querySelectorAll('.process-step');
      let currentActive = 0;
      
      stepElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.6) {
          currentActive = index;
        }
      });
      
      setActiveStep(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation after a slight delay for layout mounting
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="process" className="py-24 px-6 md:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Sticky Left Info */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-3">
              Our Proven Digital Process
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium">
              At Gradix Technologies, we follow a structured and practical approach to transform ideas into reliable digital solutions. Our process ensures clarity, efficiency, and scalable growth for your business.
            </p>
          </div>

          {/* Scrolling Right Timeline */}
          <div ref={timelineRef} className="lg:col-span-8 relative pl-6 sm:pl-10">
            {/* Timeline Vertical Background Track */}
            <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-neutral-200 dark:bg-neutral-800" />
            
            {/* Timeline Vertical Active Progress Track */}
            <div 
              className="absolute left-0 top-4 w-[2px] bg-primary-500 transition-all duration-500 ease-out origin-top"
              style={{ 
                height: activeStep === 0 
                  ? '0%' 
                  : activeStep === steps.length - 1 
                    ? '100%' 
                    : `${(activeStep / (steps.length - 1)) * 100}%` 
              }} 
            />

            <div className="space-y-12 sm:space-y-16">
              {steps.map((step, idx) => {
                const isCompleted = idx < activeStep;
                const isActive = idx === activeStep;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    key={idx}
                    className="relative group process-step"
                  >
                    {/* Timeline bullet orbs based on scroll state */}
                    {isCompleted ? (
                      <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary-500 border-2 border-primary-500 text-white transition-all duration-500 shadow-md">
                        <HiCheck className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </div>
                    ) : isActive ? (
                      <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white dark:bg-[#09090b] border-2 border-primary-500 transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary-500 animate-pulse" />
                      </div>
                    ) : (
                      <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 transition-all duration-500">
                        <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      </div>
                    )}

                    {/* Content Card with active style highlighting */}
                    <div className={`rounded-3xl border transition-all duration-300 p-6 sm:p-8 ${
                      isActive 
                        ? 'border-primary-500/50 bg-white/70 dark:bg-neutral-900/40 shadow-sm shadow-primary-500/5 dark:shadow-none' 
                        : 'border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/25 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        {/* Step Number & Title */}
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-black text-primary-500 font-mono tracking-wider">
                            {step.number}
                          </span>
                          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium">
                        {step.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="mt-5 pt-4 border-t border-neutral-200/30 dark:border-neutral-800/30">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2.5">
                          Key Outputs
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((del, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-100/60 dark:bg-neutral-800/50 border border-neutral-200/20 dark:border-neutral-750 text-neutral-600 dark:text-neutral-350"
                            >
                              {del}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
