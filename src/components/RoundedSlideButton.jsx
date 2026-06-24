import React from 'react';

export default function RoundedSlideButton({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary", // primary, secondary, outline
  ...props
}) {
  const baseStyle = "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-300 focus:outline-none";

  const variants = {
    primary: "bg-primary-600 text-white hover:text-primary-900 border border-primary-600",
    secondary: "bg-neutral-900 text-white hover:text-neutral-900 border border-neutral-900 dark:bg-white dark:text-black dark:hover:text-white dark:border-white",
    outline: "bg-transparent text-neutral-800 dark:text-neutral-200 hover:text-white dark:hover:text-black border border-neutral-300 dark:border-neutral-700 hover:border-primary-600 dark:hover:border-white",
    white: "bg-white text-primary-750 hover:text-white border border-white"
  };

  const slideBg = {
    primary: "bg-white",
    secondary: "bg-white dark:bg-neutral-900",
    outline: "bg-primary-600 dark:bg-white",
    white: "bg-primary-700 dark:bg-primary-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Sliding background container */}
      <span className={`absolute inset-0 z-0 w-full h-full -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${slideBg[variant]}`} />

      {/* Button Text */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
