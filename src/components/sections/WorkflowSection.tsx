"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Workflow Steps Data
 */
const STEPS = [
  {
    id: "summary",
    title: "Article Summary",
    desc: "Browse web + \"Summarize key points.\" Auto-reads and summarizes.",
    src: "/videos/workflow/step1-summary.mp4",
  },
  {
    id: "translate",
    title: "Instant Translation",
    desc: "Select text + \"Translate to German.\" Outputs translation directly.",
    src: "/videos/workflow/step2-translate.mp4",
  },
  {
    id: "analyze",
    title: "Data Analysis",
    desc: "Extract insights from tables. Formats data instantly.",
    src: "/videos/workflow/step3-analyze.mp4",
  },
];

/**
 * WorkflowSection Component
 * Both columns stay sticky, scroll progress drives state changes
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
    const stepCount = STEPS.length;
    const stepSize = 1 / stepCount;
    const currentIndex = Math.min(Math.floor(latest / stepSize), stepCount - 1);

    // Calculate progress within current step (0 to 1)
    const progressInStep = (latest - currentIndex * stepSize) / stepSize;

    setActiveIndex(Math.max(0, currentIndex));
    setStepProgress(Math.min(Math.max(progressInStep, 0), 1));
  });

  // Handle step click navigation
  const handleStepClick = (index: number) => {
    if (!sectionRef.current) return;
    
    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / STEPS.length;
    const targetScroll = sectionTop + sectionHeight * targetProgress;
    
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black pt-45"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* Sticky Container - Both columns stay fixed */}
      <div className="sticky top-[-60px] h-screen overflow-hidden">
        <div className="mx-auto max-w-container px-6 h-full flex flex-col justify-center">
          {/* Section Header */}
          <div className="text-center mb-12">
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

          {/* Main Grid - 30/70 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 items-start">
            {/* Left Column - Progress & Steps (All Sticky) */}
            <div className="flex flex-col">
              {/* Progress Indicator */}
              <div className="flex items-center gap-3 mb-8">
                {STEPS.map((step, index) => (
                  <ProgressDot
                    key={step.id}
                    isActive={index === activeIndex}
                    progress={index === activeIndex ? stepProgress : index < activeIndex ? 1 : 0}
                    onClick={() => handleStepClick(index)}
                  />
                ))}
              </div>

              {/* Step Items */}
              <div className="flex flex-col gap-0">
                {STEPS.map((step, index) => (
                  <StepItem
                    key={step.id}
                    step={step}
                    isActive={index === activeIndex}
                    onClick={() => handleStepClick(index)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Video Stage */}
            <div className="hidden lg:block">
              <VideoStage
                videoSrc={STEPS[activeIndex].src}
                stepId={STEPS[activeIndex].id}
              />
            </div>
          </div>

          {/* Mobile Video - Below steps on small screens */}
          <div className="lg:hidden mt-8">
            <VideoStage
              videoSrc={STEPS[activeIndex].src}
              stepId={STEPS[activeIndex].id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ProgressDot Component
 */
interface ProgressDotProps {
  isActive: boolean;
  progress: number;
  onClick?: () => void;
}

function ProgressDot({ isActive, progress, onClick }: ProgressDotProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-full flex items-center justify-start p-[2px] cursor-pointer",
        isActive ? "w-[52px] h-3 bg-white" : "w-3 h-3 bg-white/50"
      )}
      animate={{
        width: isActive ? 52 : 12,
        height: 12,
        backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
    >
      {isActive && (
        <motion.div
          className="h-full bg-black rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      )}
    </motion.div>
  );
}

/**
 * StepItem Component
 */
interface StepItemProps {
  step: (typeof STEPS)[number];
  isActive: boolean;
  onClick?: () => void;
}

function StepItem({ step, isActive, onClick }: StepItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center py-6 cursor-pointer transition-opacity duration-300",
        !isActive && "opacity-50"
      )}
      onClick={onClick}
    >
      <h3
        className={cn(
          "text-[28px] font-semibold transition-colors duration-300",
          isActive ? "text-white" : "text-white/50"
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "text-base font-normal mt-2 transition-colors duration-300",
          isActive ? "text-zinc-300" : "text-zinc-500"
        )}
      >
        {step.desc}
      </p>
      <div className="mt-6 h-px bg-zinc-800/50" />
    </div>
  );
}

/**
 * VideoStage Component
 */
interface VideoStageProps {
  videoSrc: string;
  stepId: string;
}

function VideoStage({ videoSrc, stepId }: VideoStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [stepId]);

  return (
    <motion.div
      className={cn(
        "relative w-full aspect-[5/4]",
        "bg-zinc-900 rounded-[20px]",
        "shadow-2xl shadow-black/30",
        "overflow-hidden"
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
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
