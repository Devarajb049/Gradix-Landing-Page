import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logoLight from '../assets/logo-light.png';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1600;
    const intervalTime = 16;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return Math.min(prev + step, 100)
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-darkBg text-white select-none"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-8">

        {/* Animated Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full flex items-center justify-center mb-12"
        >
          <motion.img
            src={logoLight}
            alt="Gradix Technologies"
            className="w-[280px] md:w-[400px] lg:w-[500px] h-auto object-contain mx-auto"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Loading Progress Bar */}
        <div className="h-[2px] w-full max-w-md bg-neutral-800/80 overflow-hidden rounded-full mb-3">
          <motion.div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-cyan-400"
          />
        </div>

        {/* Percentage Counter */}
        <div className="flex justify-between items-center w-full max-w-md text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">
          <span>Systems Initializing</span>
          <span className="text-neutral-100">
            {Math.round(progress)}%
          </span>
        </div>

      </div>
    </motion.div>
  );
}