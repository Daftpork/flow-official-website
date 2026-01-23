"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Workflow Steps Data
 * Single source of truth for all workflow demos
 */
const WORKFLOW_STEPS = [
  {
    id: "summary",
    title: "Article Summary",
    description: "Browse web + \"Summarize key points.\"",
    highlight: "Auto-reads and summarizes.",
    videoSrc: "/videos/workflow/summary-demo.mp4",
  },
  {
    id: "translate",
    title: "Instant Translation",
    description: "Select text + \"Translate to German.\"",
    highlight: "Outputs translation directly.",
    videoSrc: "/videos/workflow/summary-demo.mp4", // Placeholder
  },
  {
    id: "analyze",
    title: "Data Analysis",
    description: "Extract insights from tables.",
    highlight: "Formats data instantly.",
    videoSrc: "/videos/workflow/summary-demo.mp4", // Placeholder
  },
];

/**
 * WorkflowSection Component
 * Section 4: Seamless Workflows - Sticky Scroll Layout
 */
export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate active index and step progress based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stepCount = WORKFLOW_STEPS.length;
    const stepSize = 1 / stepCount;
    const currentIndex = Math.min(Math.floor(latest / stepSize), stepCount - 1);
    
    // Calculate progress within current step (0 to 1)
    const progressInStep = (latest - currentIndex * stepSize) / stepSize;
    
    setActiveIndex(currentIndex);
    setStepProgress(Math.min(Math.max(progressInStep, 0), 1));
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: `${WORKFLOW_STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen">
        <div className="mx-auto max-w-container px-6 h-full flex flex-col justify-center">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-h2 text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Seamless Workflows
            </motion.h2>
            <motion.p
              className="text-lg text-zinc-400 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From emails to data analysis, handle tasks without breaking your stride.
            </motion.p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Scroll Triggers */}
            <div className="flex flex-col gap-6">
              {WORKFLOW_STEPS.map((step, index) => (
                <WorkflowStep
                  key={step.id}
                  step={step}
                  isActive={index === activeIndex}
                  progress={index === activeIndex ? stepProgress : index < activeIndex ? 1 : 0}
                />
              ))}
            </div>

            {/* Right Column - Sticky Video Stage */}
            <div className="h-fit">
              <VideoStage
                videoSrc={WORKFLOW_STEPS[activeIndex].videoSrc}
                stepId={WORKFLOW_STEPS[activeIndex].id}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * WorkflowStep Component
 * Individual step with progress indicator
 */
interface WorkflowStepProps {
  step: (typeof WORKFLOW_STEPS)[number];
  isActive: boolean;
  progress: number;
}

function WorkflowStep({ step, isActive, progress }: WorkflowStepProps) {
  return (
    <div className="relative">
      {/* Progress Indicator */}
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="relative overflow-hidden rounded-full bg-zinc-800"
          animate={{
            width: isActive ? 48 : 8,
            height: 8,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Fill Bar */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-white rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </motion.div>
      </div>

      {/* Text Content */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      >
        <h3
          className={cn(
            "text-2xl lg:text-3xl font-medium transition-colors duration-300",
            isActive ? "text-white" : "text-zinc-600"
          )}
        >
          {step.title}
        </h3>
        
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-base lg:text-lg text-zinc-400 mt-3">
              {step.description}
            </p>
            <p className="text-base lg:text-lg text-zinc-400 mt-1">
              <span className="text-zinc-300">→</span> {step.highlight}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Divider */}
      <div className="mt-6 h-px bg-zinc-800/50" />
    </div>
  );
}

/**
 * VideoStage Component
 * The sticky white card containing the demo video
 */
interface VideoStageProps {
  videoSrc: string;
  stepId: string;
}

function VideoStage({ videoSrc, stepId }: VideoStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Restart video when step changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  }, [stepId]);

  return (
    <motion.div
      className={cn(
        "relative w-full h-[400px] lg:h-[500px]",
        "bg-white rounded-[24px]",
        "shadow-2xl shadow-black/20",
        "overflow-hidden",
        "border border-white/10"
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <video
        ref={videoRef}
        key={stepId}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-top"
      />
    </motion.div>
  );
}
