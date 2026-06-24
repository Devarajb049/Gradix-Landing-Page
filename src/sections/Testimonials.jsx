import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { FaFemale, FaMale } from 'react-icons/fa';
import Magnetic from '../components/Magnetic';

const reviews = [
  {
    quote: "What we expected was great, but Gradix delivered even better. Their solutions exceeded our expectations and truly made a difference.",
    author: "Ms Prithika Sri",
    role: "Director, Nexyuga Innovations",
    gender: "female"
  },
  {
    quote: "Working with the team exceeded our expectations. Our software performs flawlessly, boosts productivity, ensures efficiency, and makes daily operations effortless.",
    author: "Mr Vishnu",
    role: "Xiaomi Retails",
    gender: "male"
  },
  {
    quote: "The development process was smooth and professional. Our custom software now drives growth, improves workflow, simplifies tasks, and delivers real impact.",
    author: "Mr Pradeep",
    role: "Forever Finds",
    gender: "male"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef(null);

  const slideNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(slideNext, 6000); // 6s auto-slide
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleManualNext = () => {
    slideNext();
    resetTimer();
  };

  const handleManualPrev = () => {
    slidePrev();
    resetTimer();
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 150 : -150,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 px-6 md:px-8 bg-transparent">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            Trusted by Growing Businesses
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-3">
            Real Stories from Real Partners
          </h2>
        </div>

        {/* Testimonials Slider Card */}
        <div className="relative rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/35 backdrop-blur-md p-8 sm:p-12 md:p-16 overflow-hidden min-h-[380px] sm:min-h-[320px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">

          <div
            className="relative overflow-hidden flex-grow"
            onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
            onMouseLeave={resetTimer}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.32, 0.94, 0.6, 1] }}
                className="w-full flex flex-col"
              >
                {/* Quote Text */}
                <p className="text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed text-neutral-850 dark:text-neutral-200 tracking-tight">
                  “{reviews[index].quote}”
                </p>

                {/* Profile Meta */}
                <div className="flex items-center gap-4 mt-8">
                  {reviews[index].gender === 'female' ? (
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white shadow-md border border-pink-400/20 shrink-0">
                      <FaFemale className="h-6.5 w-6.5" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-500 via-cyan-500 to-primary-500 text-white shadow-md border border-blue-400/20 shrink-0">
                      <FaMale className="h-6.5 w-6.5" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {reviews[index].author}
                    </h4>
                    <span className="text-xs text-neutral-500 dark:text-neutral-450">
                      {reviews[index].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-neutral-200/30 dark:border-neutral-800/30">
            {/* Slider Dots */}
            <div className="flex gap-2">
              {reviews.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setDirection(dotIdx > index ? 1 : -1);
                    setIndex(dotIdx);
                    resetTimer();
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === dotIdx ? 'w-6 bg-primary-500' : 'w-1.5 bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex gap-3">
              <Magnetic strength={0.25}>
                <button
                  onClick={handleManualPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-450 hover:text-primary-500 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <HiArrowLeft className="h-5 w-5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={handleManualNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-450 hover:text-primary-500 transition-colors"
                  aria-label="Next testimonial"
                >
                  <HiArrowRight className="h-5 w-5" />
                </button>
              </Magnetic>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
