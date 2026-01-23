"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Phrases for the typewriter effect
 */
const PHRASES = [
  "Flow",
  "Context-Aware Voice AI",
  "Speak to type",
  "Next-Gen AI Voice Input",
];

/**
 * Typewriter timing configuration
 */
const TYPING_SPEED = 80; // ms per character
const DELETING_SPEED = 40; // ms per character
const PAUSE_AFTER_TYPING = 2000; // ms
const PAUSE_AFTER_DELETING = 500; // ms

/**
 * CTASection Component
 * Section 6: Final Call-to-Action with Typewriter and Rotating Visual
 */
export default function CTASection() {
  return (
    <section className="relative w-full bg-black pt-32 pb-0 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-container px-6 flex flex-col items-center text-center">
        {/* Typewriter Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TypewriterTitle phrases={PHRASES} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg text-zinc-400 mt-6 mb-10 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Download Linso and get your life in order with AI.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.button
          className={cn(
            "px-8 py-4 rounded-full font-medium text-base",
            "bg-white text-black hover:bg-zinc-200",
            "transition-colors duration-200"
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Download for Free
        </motion.button>
      </div>

      {/* Bottom Visual - Rotating Stones */}
      <div className="relative mt-16 flex justify-center">
        {/* Gradient Mask Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 30%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%)",
          }}
        />

        {/* Rotating Stones Image */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            ease: "linear",
            repeat: Infinity,
          }}
          className="relative"
        >
          <Image
            src="/images/cta-stones.png"
            alt="Decorative glass stones"
            width={800}
            height={600}
            className="w-full max-w-[800px] h-auto"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * TypewriterTitle Component
 * Types, pauses, deletes, and loops through phrases
 */
interface TypewriterTitleProps {
  phrases: string[];
}

function TypewriterTitle({ phrases }: TypewriterTitleProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[phraseIndex];

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      } else {
        // Finished typing, pause then start deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPING);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, PAUSE_AFTER_DELETING);
      }
    }
  }, [displayText, isDeleting, isPaused, currentPhrase, phrases.length]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
      <span>{displayText}</span>
      <span className="animate-pulse">|</span>
    </h1>
  );
}
