"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Linso", href: "#linso" },
  { label: "Flow", href: "#flow" },
  { label: "Show Case", href: "#showcase" },
  { label: "Download", href: "#download" },
  { label: "Resources", href: "#resources" },
];

/**
 * Dynamic Island style Navbar
 * Expands when at top or scrolling up, shrinks when scrolling down
 */
export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollThreshold = 100;

    if (latest <= scrollThreshold) {
      // At top - always expanded
      setIsExpanded(true);
    } else if (latest > lastScrollY) {
      // Scrolling down - shrink
      setIsExpanded(false);
    } else {
      // Scrolling up - expand
      setIsExpanded(true);
    }

    setLastScrollY(latest);
  });

  return (
    <motion.nav
      className={cn(
        "fixed top-4 left-1/2 z-50",
        "flex items-center justify-between",
        "bg-black/40 backdrop-blur-[10px]",
        "border border-white/15",
        "rounded-full",
        "px-6 py-3"
      )}
      initial={{ x: "-50%", opacity: 0, y: -20 }}
      animate={{
        x: "-50%",
        opacity: 1,
        y: 0,
        width: isExpanded ? "min(1040px, calc(100vw - 32px))" : "auto",
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Left: Logo */}
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/FlowLogo.svg"
          alt="Flow Logo"
          width={107}
          height={24}
          className="h-6 w-auto"
          priority
        />
      </Link>

      {/* Center: Nav Links */}
      <motion.div
        className="flex items-center gap-8"
        animate={{
          opacity: isExpanded ? 1 : 0,
          width: isExpanded ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          overflow: "hidden",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </motion.div>

      {/* Right: Language Selector */}
      <button
        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex-shrink-0"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <motion.span
          animate={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden whitespace-nowrap"
        >
          English
        </motion.span>
      </button>
    </motion.nav>
  );
}
