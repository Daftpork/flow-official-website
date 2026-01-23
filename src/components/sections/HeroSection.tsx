"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroBackground from "@/components/ui/HeroBackground";
import TypewriterText from "@/components/ui/TypewriterText";
import FlipButton from "@/components/ui/FlipButton";

/**
 * Animation variants for staggered entrance
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  },
};

/**
 * HeroSection Component
 * The main hero section of Linso Flow landing page
 */
export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-black">
      {/* Layer 0: Background */}
      <HeroBackground />

      {/* Radial gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Layer 10: Content */}
      <motion.div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Dev Badge GIF */}
        <motion.div variants={itemVariants} className="mb-8">
          <Image
            src="/images/dev-badge.gif"
            alt="Dev Badge"
            width={120}
            height={32}
            className="h-8 w-auto"
            unoptimized // Required for GIFs to animate
            priority
          />
        </motion.div>

        {/* H1 Title Block - Multiline Typewriter */}
        <motion.div variants={itemVariants}>
          <h1 className="text-h1 text-white text-center">
            <TypewriterText
              lines={["Speak to type", "AI understands your flow"]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
              initialDelay={600}
              loop={true}
              showCursor={true}
              cursorChar="|"
              cursorBlinkDuration={0.53}
              variableSpeed={{ min: 60, max: 120 }}
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-hero-sub text-white text-center max-w-2xl"
        >
          Linso Flow — Context-Aware Voice AI for macOS
        </motion.p>

        {/* CTA Button - 64px gap from subtitle */}
        <motion.div variants={itemVariants} className="mt-16">
          <FlipButton>Download for Free</FlipButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
