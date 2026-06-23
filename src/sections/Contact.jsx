import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedinIn, FaDribbble, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { HiEnvelope, HiMapPin, HiPaperAirplane, HiPhone } from 'react-icons/hi2';
import Magnetic from '../components/Magnetic';
import RoundedSlideButton from '../components/RoundedSlideButton';
import { FaXTwitter } from 'react-icons/fa6';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    // Mock submit state
    setIsSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-8 bg-neutral-50/50 dark:bg-neutral-900/10 border-t border-neutral-200/40 dark:border-neutral-800/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Contact Information (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
                Start a Conversation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mt-3 leading-tight">
                Let’s create something legendary together<span className="text-cyan-400">.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium max-w-md">
                Have an ambitious project or want to establish an immersive design system? Reach out. Our team is ready to deliver.
              </p>
            </div>

            {/* Info details */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850 text-neutral-700 dark:text-neutral-300">
                  <HiEnvelope className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">
                    Direct Email
                  </span>
                  <a href="mailto:hello@gradixtech.com" className="text-sm font-bold text-neutral-800 dark:text-neutral-250 hover:text-primary-500 transition-colors">
                    hello@gradixtech.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850 text-neutral-700 dark:text-neutral-300">
                  <HiPhone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">
                    Call Us
                  </span>
                  <a href="tel:+919488783430" className="text-sm font-bold text-neutral-800 dark:text-neutral-250 hover:text-primary-500 transition-colors">
                    +91 94887 83430
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850 text-neutral-700 dark:text-neutral-300">
                  <HiMapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">
                    HQ Location
                  </span>
                  <span className="text-sm font-bold text-neutral-800 dark:text-neutral-250 leading-relaxed block">
                    Ground Floor, PTC block, K S Rangasamy college of Technology, Tiruchengode, Namakkal, 637 215.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-4">
                Connect Across Networks
              </span>
              <div className="flex gap-4">
                {[
                  { icon: FaWhatsapp, href: 'https://wa.me/9488783430', label: 'Whatsapp' },
                  { icon: FaInstagram, href: 'https://www.instagram.com/gradix_technologies/', label: 'Instagram' },
                  { icon: FaXTwitter, href: 'https://x.com/gradix_tech', label: 'Twitter' },
                  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/gradix-technologies/', label: 'LinkedIn' },
                ].map((social, sIdx) => {
                  const Icon = social.icon;
                  return (
                    <Magnetic key={sIdx} strength={0.3}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-gradient-to-tr hover:from-primary-600 hover:to-cyan-400 hover:text-white hover:border-transparent transition-all shadow-sm"
                        aria-label={social.label}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Area (Right) */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-3xl border border-neutral-200/50 dark:border-neutral-800/60 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow">

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-450 block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-5 py-3.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-450 block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. john@company.com"
                    className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-5 py-3.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-neutral-450 dark:text-neutral-450 block mb-2">
                    Project Goals / Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your design needs, deadlines, or technical stack specifications..."
                    className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-5 py-3.5 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Magnetic strength={0.15}>
                    <RoundedSlideButton
                      type="submit"
                      disabled={isSubmitted}
                      variant="secondary"
                      className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-widest"
                    >
                      {isSubmitted ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <>
                          Send Message
                          <HiPaperAirplane className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </RoundedSlideButton>
                  </Magnetic>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
