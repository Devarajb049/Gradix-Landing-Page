import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiCheck } from 'react-icons/hi';
import RoundedSlideButton from './RoundedSlideButton';

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-neutral-900/70 backdrop-blur-md p-4 sm:p-6 fixed inset-0 z-50 grid place-items-center overflow-y-auto cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, rotate: "-2deg", y: 30 }}
            animate={{ scale: 1, rotate: "0deg", y: 0 }}
            exit={{ scale: 0.9, rotate: "0deg", y: 30 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl w-full max-w-4xl shadow-2xl cursor-default relative overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded-full transition-all"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>

            {/* Left side: Image & Stats */}
            <div className="w-full md:w-5/12 bg-neutral-50 dark:bg-neutral-950 flex flex-col border-b md:border-b-0 md:border-r border-neutral-100 dark:border-neutral-800/80 overflow-y-auto">
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 bg-primary-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* Stats/Metrics Block */}
              <div className="p-6 flex-grow">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">
                  Key Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {project.stats?.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/50 shadow-sm"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Case Study Text content */}
            <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col h-full">
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  {project.title}
                </h3>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/20 dark:border-neutral-750"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Body */}
              <div className="space-y-6 flex-grow text-neutral-700 dark:text-neutral-300">
                {/* Challenge */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-2">
                    The Challenge
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-2">
                    Our Solution
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Impact */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-3">
                    Business Impact
                  </h4>
                  <ul className="space-y-2">
                    {project.impact?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                          <HiCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                <RoundedSlideButton
                  variant="secondary"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs uppercase tracking-wider"
                >
                  Close Case Study
                </RoundedSlideButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
