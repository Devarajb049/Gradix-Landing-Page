import { motion } from 'framer-motion';
import { 
  HiCode, 
  HiColorSwatch, 
  HiDatabase, 
  HiDeviceMobile, 
  HiPencilAlt, 
  HiTrendingUp 
} from 'react-icons/hi';
import GlowContainer from '../components/GlowContainer';

const services = [
  {
    icon: HiCode,
    title: 'Web Development',
    description: 'Building websites that combine sleek design with robust functionality. Helping businesses connect, engage, and grow online.',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: HiColorSwatch,
    title: 'UI / UX Development',
    description: 'We design intuitive and engaging user interfaces that provide seamless experiences. Our designs turn complex ideas into user-friendly digital journeys.',
    color: 'from-violet-500 to-fuchsia-500'
  },
  {
    icon: HiDatabase,
    title: 'Software Development',
    description: 'Building software that adapts to your needs. Reliable, innovative, and optimized for seamless performance and scalability.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: HiDeviceMobile,
    title: 'App Development',
    description: 'Apps that captivate, inspire, and deliver results. Transforming concepts into mobile solutions that scale, perform, and inspire growth.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: HiPencilAlt,
    title: 'Content Creations',
    description: 'Content that tells your story, engages your audience, and builds trust. Transforming ideas into powerful experiences that create results.',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: HiTrendingUp,
    title: 'Digital Marketing',
    description: 'Digital marketing that connects, engages, and converts to drive growth. Creating campaigns that grow your brand, inspire action, and deliver impact to boost visibility.',
    color: 'from-emerald-500 to-teal-500'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-8 bg-transparent relative">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-3">
            Customizable Digital Solutions for your Growth
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 font-medium">
            Need a custom solution? Let’s plan and build the right solution for your business.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <GlowContainer className="rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-md p-8 h-full transition-all duration-300 group hover:shadow-lg dark:hover:shadow-none hover:-translate-y-1">
                  {/* Icon Wrapper */}
                  <div className="relative inline-flex items-center justify-center p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 mb-6 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-primary-600 group-hover:to-cyan-400 group-hover:text-white transition-all duration-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium">
                    {service.description}
                  </p>
                </GlowContainer>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
