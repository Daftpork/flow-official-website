"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animation variants for scroll-into-view
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * FeaturesSection Component
 * Section 3: Intelligent Core Features - Bento Grid Layout
 */
export default function FeaturesSection() {
  return (
    <section className="w-full bg-black pt-45">
      <motion.div
        className="mx-auto max-w-container px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-h2 text-white">Intelligent Core Features</h2>
          <p className="mt-4 text-base text-zinc-400 font-normal">
            The AI engine that powers your productivity.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-[40px] items-stretch"
        >
          {/* Column 1: Left - Stacked Cards */}
          <div className="flex flex-col gap-[40px]">
            {/* Card 1: Global Floating Window */}
            <FeatureCard
              image="/images/features/floating-window.png"
              imageAlt="Global Floating Window"
              title="Global Floating Window"
              subtitle="One-click activation in any app. Supports Voice, Text, and File inputs."
            />

            {/* Card 2: Context Awareness */}
            <FeatureCard
              image="/images/features/context-awareness.png"
              imageAlt="Context Awareness"
              title="Context Awareness"
              subtitle="Auto-reads Browser/Word/Excel. No copy-paste required."
            />
          </div>

          {/* Column 2: Right - Tall Card */}
          <motion.div
            className={cn(
              "h-full flex flex-col",
              "bg-black",
              "border border-white/15 hover:border-white/30",
              "rounded-[20px]",
              "p-8",
              "transition-colors duration-300"
            )}
            variants={itemVariants}
          >
            {/* Image Area - Flex-1 takes remaining space */}
            <div className="flex-1 relative w-full min-h-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] rounded-[12px]">
              <Image
                src="/images/features/smart-memory.png"
                alt="Smart Memory"
                fill
                className="object-contain object-center p-4"
              />
            </div>

            {/* Text Content */}
            <div className="mt-6">
              <h3 className="text-h3 text-white mb-2">Smart Memory</h3>
              <p className="text-base text-zinc-400 font-normal">
                Short-term + Permanent memory. Automatically referenced in AI interactions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * FeatureCard Component
 * Fixed height card with flex layout
 */
interface FeatureCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}

function FeatureCard({ image, imageAlt, title, subtitle }: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "h-auto flex flex-col",
        "bg-black",
        "border border-white/15 hover:border-white/30",
        "rounded-[20px]",
        "p-8",
        "transition-colors duration-300"
      )}
      variants={itemVariants}
    >
      {/* Image Area - Auto height, content-driven */}
      <div className="w-full relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] rounded-[12px]">
        <Image
          src={image}
          alt={imageAlt}
          width={400}
          height={266}
          className="relative z-10 w-full h-auto"
        />
      </div>

      {/* Text Content - Natural flow */}
      <div className="mt-6">
        <h3 className="text-h3 text-white mb-2">{title}</h3>
        <p className="text-base text-zinc-400 font-normal">{subtitle}</p>
      </div>
    </motion.div>
  );
}
