"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TypewriterText Props Interface
 */
export interface TypewriterTextProps {
  /** Array of text strings - each string is a separate line */
  lines: string[];
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for each line */
  lineClassName?: string;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Cursor character to display */
  cursorChar?: string;
  /** Additional cursor CSS classes */
  cursorClassName?: string;
  /** Cursor blink animation duration in seconds */
  cursorBlinkDuration?: number;
  /** Base typing speed in milliseconds */
  typingSpeed?: number;
  /** Pause duration after completing all lines (ms) */
  pauseDuration?: number;
  /** Initial delay before typing starts (ms) */
  initialDelay?: number;
  /** Variable speed range for natural typing feel */
  variableSpeed?: { min: number; max: number } | null;
  /** Whether to loop the animation */
  loop?: boolean;
}

/**
 * MultilineTypewriterText Component
 * A typewriter effect that types multiple lines sequentially
 * with reserved space for all lines to prevent layout shift
 * NO delete effect - just resets and types again
 */
export default function TypewriterText({
  lines,
  className,
  lineClassName,
  showCursor = true,
  cursorChar = "|",
  cursorClassName,
  cursorBlinkDuration = 0.53,
  typingSpeed = 80,
  pauseDuration = 2000,
  initialDelay = 500,
  variableSpeed = { min: 60, max: 120 },
  loop = true,
}: TypewriterTextProps) {
  // State for tracking which line we're on and what's displayed
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [displayedLines, setDisplayedLines] = React.useState<string[]>(
    lines.map(() => "")
  );
  const [charIndex, setCharIndex] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  // Variable typing speed calculator
  const getRandomSpeed = React.useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  // Initial delay
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, initialDelay);
    return () => clearTimeout(timeout);
  }, [initialDelay]);

  // Main typing loop
  React.useEffect(() => {
    if (!hasStarted || isComplete) return;

    let timeout: ReturnType<typeof setTimeout>;

    const currentLine = lines[currentLineIndex] || "";

    if (charIndex < currentLine.length) {
      // Still typing current line
      timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.slice(0, charIndex + 1);
          return newLines;
        });
        setCharIndex((i) => i + 1);
      }, variableSpeed ? getRandomSpeed() : typingSpeed);
    } else {
      // Finished typing current line
      if (currentLineIndex < lines.length - 1) {
        // Move to next line
        timeout = setTimeout(() => {
          setCurrentLineIndex((i) => i + 1);
          setCharIndex(0);
        }, 200); // Small pause before next line
      } else {
        // All lines typed - mark as complete
        setIsComplete(true);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    hasStarted,
    isComplete,
    currentLineIndex,
    charIndex,
    lines,
    typingSpeed,
    variableSpeed,
    getRandomSpeed,
  ]);

  // Separate effect for pause and reset (no delete)
  React.useEffect(() => {
    if (!isComplete || !loop) return;

    const timeout = setTimeout(() => {
      // Reset everything and start over
      setDisplayedLines(lines.map(() => ""));
      setCurrentLineIndex(0);
      setCharIndex(0);
      setIsComplete(false);
    }, pauseDuration);

    return () => clearTimeout(timeout);
  }, [isComplete, loop, pauseDuration, lines]);

  // Cursor always on the last line that has content, or first line if empty
  const getCursorLineIndex = () => {
    if (isComplete) return lines.length - 1;
    return currentLineIndex;
  };

  const cursorLineIndex = getCursorLineIndex();

  return (
    <div className={cn("relative", className)}>
      {lines.map((line, index) => (
        <div
          key={index}
          className={cn("relative", lineClassName)}
        >
          {/* Invisible placeholder text to reserve space - includes cursor width */}
          <span className="invisible" aria-hidden="true">
            {line}
            {/* Reserve space for cursor on the line where it will appear */}
            {index === cursorLineIndex && showCursor && (
              <span>{cursorChar}</span>
            )}
          </span>

          {/* Visible typed text - using whitespace-nowrap to prevent cursor wrapping */}
          <span className="absolute inset-0 whitespace-nowrap">
            {displayedLines[index]}
            {/* Cursor appears inline at the end of the current typing line */}
            {showCursor && index === cursorLineIndex && (
              <motion.span
                className={cn("inline", cursorClassName)}
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: cursorBlinkDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              >
                {cursorChar}
              </motion.span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
