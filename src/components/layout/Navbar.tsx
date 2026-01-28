"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Language } from "@/lib/translations";

/**
 * Language options
 */
const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

/**
 * Dynamic Island style Navbar
 * Expands when at top or scrolling up, shrinks when scrolling down
 */
export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Nav links using translations
  const navLinks = [
    { label: t.nav.linso, href: "#linso" },
    { label: t.nav.flow, href: "#flow" },
    { label: t.nav.showcase, href: "#showcase" },
    { label: t.nav.download, href: "#download" },
    { label: t.nav.resources, href: "#resources" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollThreshold = 100;

    if (latest <= scrollThreshold) {
      setIsExpanded(true);
    } else if (latest > lastScrollY) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    setLastScrollY(latest);
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle language selection
  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  // Get current language label
  const currentLanguageLabel = LANGUAGE_OPTIONS.find((opt) => opt.code === language)?.label || "English";

  return (
    <motion.nav
      className={cn(
        "fixed top-4 left-1/2 z-50",
        "flex items-center justify-between",
        "gap-[40px]",
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
      <div className="flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right: Language Selector Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            "flex items-center gap-1.5 text-sm transition-colors duration-200 flex-shrink-0",
            isDropdownOpen ? "text-white" : "text-zinc-400 hover:text-white"
          )}
          aria-label="Select language"
          aria-expanded={isDropdownOpen}
        >
          <Globe className="w-4 h-4" />
          <span className="whitespace-nowrap">{currentLanguageLabel}</span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isDropdownOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute top-full right-0 mt-2 w-32",
                "bg-zinc-900/95 backdrop-blur-md",
                "border border-white/10",
                "rounded-xl overflow-hidden",
                "shadow-xl shadow-black/30"
              )}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageSelect(option.code)}
                  className={cn(
                    "w-full px-4 py-2.5 text-sm text-left transition-colors duration-150",
                    language === option.code
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
