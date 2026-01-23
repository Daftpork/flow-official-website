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
 * Card data for the comparison
 */
const cards = [
  {
    id: "traditional",
    title: "Traditional Input",
    subtitle: "Write a thank you email",
    icon: "/images/icon-keyboard-glass.png",
    video: "/videos/demo-traditional.mp4",
    background: "bg-black",
    listItems: [
      "Think → Type → Edit/Format",
      "Frequent window switching between apps",
      "Mechanical input, interrupted thinking flow",
    ],
  },
  {
    id: "flow",
    title: "Linso Flow",
    subtitle: "Write a thank you email",
    icon: "/images/icon-flow-stones.png",
    video: "/videos/demo-flow.mp4",
    background: "bg-gradient-to-b from-[#040319] to-[#5270AE]",
    listItems: [
      "Voice → Intent → Smart Output",
      "Auto-reads current page context",
      "Remembers conversation history",
    ],
  },
];

/**
 * EfficiencySection Component
 * Section 2: 10x Efficiency Boost comparison
 */
export default function EfficiencySection() {
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
          <h2 className="text-h2 text-white">10x Efficiency Boost</h2>
          <p className="mt-6 text-base text-zinc-400 font-normal">
            Traditional Typing 20-30 wpm → Voice + AI 150-200 wpm
          </p>
        </motion.div>

        {/* Comparison Cards Grid */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {cards.map((card) => (
            <ComparisonCard key={card.id} {...card} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * ComparisonCard Component
 */
interface ComparisonCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  video: string;
  background: string;
  listItems: string[];
}

function ComparisonCard({
  title,
  subtitle,
  icon,
  video,
  background,
  listItems,
}: ComparisonCardProps) {
  return (
    <motion.div
      className={cn(
        "relative flex flex-col",
        "rounded-[20px]",
        "border border-white/15",
        "pt-8 px-12 pb-12",
        "overflow-hidden",
        background
      )}
      variants={itemVariants}
    >
      {/* Icon - Top Right with blend mode */}
      <div className="absolute top-6 right-6">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={100}
          height={100}
          className="w-[100px] h-auto object-contain mix-blend-lighten"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-h3 text-white pr-28">{title}</h3>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-zinc-400 font-normal">{subtitle}</p>

        {/* List */}
        <ul className="mt-6 space-y-3 flex-grow">
          {listItems.map((item, index) => (
            <li key={index} className="text-base text-white font-normal">
              {item}
            </li>
          ))}
        </ul>

        {/* Video Container - Fixed height, white bg for seamless extension */}
        <div className="mt-8 rounded-[15px] overflow-hidden h-[280px] bg-white">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}
