import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMail, HiOutlineX } from 'react-icons/hi';
import { FiCheckCircle } from 'react-icons/fi';
import RoundedSlideButton from './RoundedSlideButton';

export default function SpringModal({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-neutral-900/60 backdrop-blur-md p-6 fixed inset-0 z-50 grid place-items-center overflow-y-auto cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.85, rotate: "4deg", y: 20 }}
            animate={{ scale: 1, rotate: "0deg", y: 0 }}
            exit={{ scale: 0.85, rotate: "0deg", y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-primary-600 via-primary-700 to-cyan-500 text-white p-8 rounded-2xl w-full max-w-lg shadow-2xl cursor-default relative overflow-hidden border border-white/10"
          >
            {/* Background Icon */}
            <HiOutlineMail className="text-white/5 rotate-12 text-[300px] absolute z-0 -top-20 -left-20 pointer-events-none" />

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <HiOutlineX className="h-6 w-6" />
            </button>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-white/10 w-16 h-16 mb-4 rounded-full text-3xl text-white grid place-items-center mx-auto backdrop-blur-sm">
                      <HiOutlineMail className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-1">
                      Let's Create Together
                    </h3>
                    <p className="text-center text-white/80 text-sm mb-6 max-w-sm mx-auto">
                      Drop us a line and our expert product architects will get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">
                          Project Description
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-sm resize-none"
                          placeholder="Tell us about your project goals..."
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-primary-700 hover:bg-neutral-100 transition-colors shadow-lg"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      className="bg-white w-20 h-20 mb-6 rounded-full text-5xl text-primary-600 grid place-items-center mx-auto shadow-lg"
                    >
                      <FiCheckCircle className="h-10 w-10 text-primary-600" />
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/80 max-w-xs mx-auto text-sm">
                      Thank you, {formData.name}. Our team will connect with you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
