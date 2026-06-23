import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the outer trailing ring
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 25, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 25, mass: 0.5 });

  useEffect(() => {
    // Hide standard cursor on desktop
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect if hovering over clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Outer Trailing Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 60 : 36,
          height: isHovered ? 60 : 36,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0)',
          borderColor: isHovered ? '#0066FF' : 'rgba(0, 102, 255, 0.6)',
          borderWidth: isHovered ? '2px' : '1px',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.2 }}
        className="absolute rounded-full border border-primary-500/60 dark:border-primary-400/60 mix-blend-difference"
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? '#0066FF' : '#0066FF',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="absolute h-1.5 w-1.5 rounded-full mix-blend-normal"
      />
    </div>
  );
}
