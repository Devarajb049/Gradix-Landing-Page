import { motion } from 'framer-motion';

const clients = [
  { name: 'Nexyuga Innovations', mark: 'NI' },
  { name: 'Xiaomi Retails', mark: 'XR' },
  { name: 'Forever Finds', mark: 'FF' },
  { name: 'Sri Vishnu Communications', mark: 'SVC' },

];

export default function Clients() {
  // Duplicate logos for seamless scrolling
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section id="clients" className="py-12 border-y border-neutral-200/40 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/10 overflow-hidden">


      {/* Infinite Logo Marquee Wrapper */}
      <div className="relative flex w-full overflow-hidden select-none">
        {/* Left and Right Fade overlays for premium visual continuity */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/40 to-transparent dark:from-[#09090b] dark:via-[#09090b]/40" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#fafafa] via-[#fafafa]/40 to-transparent dark:from-[#09090b] dark:via-[#09090b]/40" />

        <div className="flex animate-marquee gap-8 md:gap-12 whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/40 dark:bg-neutral-900/50 border border-neutral-200/30 dark:border-neutral-800/50 hover:border-primary-500/30 dark:hover:border-primary-500/20 backdrop-blur-xs transition-all duration-300 group cursor-pointer"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-200/60 dark:bg-neutral-800/40 text-[10px] font-extrabold text-neutral-600 dark:text-neutral-300 group-hover:bg-gradient-to-tr group-hover:from-primary-600 group-hover:to-cyan-400 group-hover:text-white transition-all duration-300">
                {client.mark}
              </div>
              <span className="text-sm font-bold tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
