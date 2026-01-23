"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Pricing Plans Data
 */
const PLANS = [
  {
    name: "Free",
    price: { monthly: "0", yearly: "0" },
    description: "For personal exploration",
    features: [
      "Smart Voice Transcription, Auto-Removes Filler Words",
      "4,000 Words/Week AI Assistance Quota",
      "Supports 60+ Languages",
      "Global Shortcut for One-Click Activation",
      "Basic Context Understanding",
    ],
    isPopular: false,
  },
  {
    name: "Pro",
    price: { monthly: "9.99", yearly: "7.99" },
    description: "For power users",
    features: [
      "Includes All Basic Features",
      "Unlimited AI Assistance Quota",
      "Smart Context: Auto-Reads Web Pages & Documents",
      "Personal Memory: Saves Custom Info",
      "Deep Integration: Optimized For Chrome/Safari/Word/Excel",
      "Streaming Output: Natural Typing Effect",
      "Priority Technical Support",
    ],
    isPopular: true,
  },
];

type BillingCycle = "monthly" | "yearly";

/**
 * PricingSection Component
 * Section 5: Subscription Plans
 */
export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="w-full bg-black py-24">
      <div className="mx-auto max-w-container px-6">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h2 text-white">Subscription Plans</h2>
          <p className="mt-4 text-lg text-zinc-400">
            The AI engine that powers your productivity.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
            <BillingToggle
              billingCycle={billingCycle}
              onChange={setBillingCycle}
            />
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PricingCard plan={plan} billingCycle={billingCycle} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * BillingToggle Component
 * Pill-shaped toggle between Monthly and Yearly
 */
interface BillingToggleProps {
  billingCycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

function BillingToggle({ billingCycle, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center bg-zinc-900 rounded-full p-1">
      <button
        onClick={() => onChange("monthly")}
        className={cn(
          "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200",
          billingCycle === "monthly" ? "text-white" : "text-zinc-500"
        )}
      >
        {billingCycle === "monthly" && (
          <motion.div
            layoutId="billing-indicator"
            className="absolute inset-0 bg-zinc-800 rounded-full"
            transition={{ type: "spring", duration: 0.4 }}
          />
        )}
        <span className="relative z-10">Monthly</span>
      </button>

      <button
        onClick={() => onChange("yearly")}
        className={cn(
          "relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2",
          billingCycle === "yearly" ? "text-white" : "text-zinc-500"
        )}
      >
        {billingCycle === "yearly" && (
          <motion.div
            layoutId="billing-indicator"
            className="absolute inset-0 bg-zinc-800 rounded-full"
            transition={{ type: "spring", duration: 0.4 }}
          />
        )}
        <span className="relative z-10">Yearly</span>
        <span className="relative z-10 bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full">
          Save 20%
        </span>
      </button>
    </div>
  );
}

/**
 * PricingCard Component
 * Individual plan card with features
 */
interface PricingCardProps {
  plan: (typeof PLANS)[number];
  billingCycle: BillingCycle;
}

function PricingCard({ plan, billingCycle }: PricingCardProps) {
  const price = plan.price[billingCycle];
  const isProPlan = plan.isPopular;

  return (
    <div
      className={cn(
        "relative flex flex-col h-full p-8 rounded-[24px]",
        isProPlan
          ? "bg-gradient-to-b from-blue-900/40 to-blue-900/10 border border-blue-500/30"
          : "bg-black border border-white/10"
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
        <p className="text-sm text-zinc-400 mt-1">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-zinc-400 text-2xl">$</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-5xl font-semibold text-white"
            >
              {price}
            </motion.span>
          </AnimatePresence>
          {price !== "0" && (
            <span className="text-zinc-400 text-lg ml-1">/month</span>
          )}
        </div>
        {billingCycle === "yearly" && price !== "0" && (
          <p className="text-sm text-zinc-500 mt-2">Billed yearly</p>
        )}
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={cn(
          "w-full py-3.5 rounded-full font-medium text-base transition-colors duration-200",
          "bg-white text-black hover:bg-zinc-200"
        )}
      >
        Download for Free
      </button>

      {/* Pro Trial Note */}
      {isProPlan && (
        <p className="text-center text-sm text-zinc-400 mt-4">
          🎁 14-day free trial of all Pro features
        </p>
      )}
    </div>
  );
}

/**
 * CheckIcon Component
 */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
