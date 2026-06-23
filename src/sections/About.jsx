import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

function Counter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (isNaN(end) || start === end) return;
      
      const totalMiliseconds = duration * 1000;
      // Ensure tick rate is not faster than 25ms to avoid browser issues
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { value: '10', suffix: '+', label: 'Projects Delivered' },
  { value: '10', suffix: '+', label: 'Completed Projects' },
  { value: '5', suffix: '+', label: 'Active Clients' },
  { value: '6', suffix: '', label: 'Digital Services' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-8 bg-neutral-50/50 dark:bg-neutral-900/10 border-y border-neutral-200/40 dark:border-neutral-800/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-20">
          {/* Statement Left */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex flex-col items-start mb-4">
              {/* Solid blue dot */}
              <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mb-3 ml-0.5" />
              
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                  About Us
                </span>
                {/* Outlined blue circle */}
                <span className="w-5 h-5 rounded-full border border-primary-600/70 dark:border-primary-400/70 flex-shrink-0" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Who We Are & What Drives Us
            </h2>
          </div>

          {/* Details Right */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-350 font-medium leading-relaxed">
              Gradix Technologies is a digital solutions company focused on building reliable, scalable, and user-centric technology products. We work with businesses to design and develop web applications, mobile apps, and custom software solutions that solve real problems and support long-term growth.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our products are engineered with robust functionality, performance testing, and a deep focus on usability. We leverage modern frameworks to deliver solutions that adapt to your exact business needs and enable clean operations.
            </p>

            {/* Values Sub-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm transition-all duration-300 hover:shadow-md">
                <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Our Mission</h4>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  To provide quality digital solutions that solve real-world problems and drive long-term business growth.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm transition-all duration-300 hover:shadow-md">
                <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Usability Standards</h4>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Ensuring high performance, fluid animations, proper keyboard navigation, and responsive scaling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-neutral-200/40 dark:border-neutral-800/40">
          {stats.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx}
              className="text-center p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/30 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white font-mono tracking-tighter mb-2">
                <Counter value={stat.value} />
                <span className="text-primary-500 dark:text-primary-400">{stat.suffix}</span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-450">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
