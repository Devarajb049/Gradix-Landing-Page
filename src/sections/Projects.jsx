import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import GlowContainer from '../components/GlowContainer';

import project1 from '../assets/Project1.png';
import project2 from '../assets/Project2.png';
import project3 from '../assets/Project3.png';

const categories = ['All', 'Design', 'Development'];

const projects = [
  {
    id: 1,
    title: 'Nexyuga Innovations',
    category: 'Development',
    tags: ['Web Application', 'MVP Development', 'React'],
    image: project2,
    description: 'Custom software application portal built for Nexyuga Innovations to optimize internal project delivery pipelines and client interfaces.',
    url: 'https://nexyuga.in/'
  },
  {
    id: 2,
    title: 'Sri Vishnu Communications',
    category: 'Development',
    tags: ['SaaS Dashboard', 'Inventory Control', 'NodeJS'],
    image: project3,
    description: 'An enterprise sales and stock tracker software developed for Sri Vishnu Communications (Xiaomi Retails) boosting internal operations efficiency.',
    url: 'https://www.srivishnucommunications.com/'
  },
  {
    id: 3,
    title: 'Forever Finds',
    category: 'Design',
    tags: ['E-Commerce', 'UX/UI Design', 'Shopify Integration'],
    image: project1,
    description: 'Custom electronic marketplace solution and layout structure optimized for Forever Finds to simplify order workflows and drive growth.',
    url: 'https://forever-find.netlify.app/'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 md:px-8 bg-transparent">
      <div className="mx-auto max-w-7xl">
        {/* Header and Filter Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
              Projects
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-3">
              Real Projects, Real Business Impact
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium">
              At Gradix Technologies, we partner with startups and businesses to build practical digital solutions. From MVP development to scalable systems, our focus is on performance, reliability, and long-term growth.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-md self-start lg:self-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${filter === cat
                  ? 'text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
              >
                {filter === cat && (
                  <motion.span
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-cyan-400 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="h-full"
              >
                <GlowContainer className="rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-md overflow-hidden h-full flex flex-col group shadow-sm hover:shadow-lg dark:hover:shadow-none transition-shadow duration-300">
                  {/* Image wrapper */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Dark/Light overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-850 text-neutral-600 dark:text-neutral-350 border border-neutral-200/20 dark:border-neutral-750"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Action Arrow */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs font-bold uppercase tracking-widest text-primary-500 dark:text-primary-400 group-hover:text-cyan-400 transition-colors gap-2 cursor-pointer mt-auto"
                    >
                      Visit Project <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </GlowContainer>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
