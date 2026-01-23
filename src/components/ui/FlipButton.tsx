"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FlipButtonProps {
  children: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * FlipButton Component
 * A button with text flip animation on hover
 * Text slides up and out while duplicate slides up from below
 */
export default function FlipButton({
  children,
  className,
  onClick,
  href,
}: FlipButtonProps) {
  const buttonContent = (
    <motion.span
      className={cn(
        "relative inline-flex items-center justify-center",
        "bg-white text-black",
        "rounded-pill",
        "px-8 py-4",
        "text-body font-medium",
        "overflow-hidden",
        "cursor-pointer",
        "transition-colors duration-200",
        "hover:bg-accent-hover",
        className
      )}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Text container with overflow hidden for mask effect */}
      <span className="relative block overflow-hidden" style={{ height: "1.5em" }}>
        {/* Original text - slides up and out on hover */}
        <motion.span
          className="block text-black"
          variants={{
            rest: { y: 0 },
            hover: { y: "-100%" },
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.span>

        {/* Duplicate text - slides up from below on hover */}
        <motion.span
          className="absolute left-0 top-0 block text-black"
          variants={{
            rest: { y: "100%" },
            hover: { y: 0 },
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      </span>
    </motion.span>
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {buttonContent}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button type="button" onClick={onClick}>
      {buttonContent}
    </button>
  );
}
