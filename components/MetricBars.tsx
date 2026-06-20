"use client";

import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

export function MetricBars({
  commits,
  solved,
}: {
  commits: number;
  solved: number;
}) {
  const max = Math.max(commits, solved, 1);
  const barHeight = 96;

  return (
    <div className="flex items-end justify-center gap-12">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-semibold text-white">
          <CountUp value={commits} />
        </div>
        <div
          className="flex w-10 items-end overflow-hidden rounded-full bg-white/10"
          style={{ height: barHeight }}
        >
          <motion.div
            className="w-full rounded-full bg-[#2ea043]"
            initial={{ height: 0 }}
            animate={{ height: `${(commits / max) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/github.svg" alt="GitHub" className="h-5 w-5 grayscale invert" />
        <div className="text-[10px] uppercase tracking-wide text-white/45">
          Commits
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-semibold text-white">
          <CountUp value={solved} />
        </div>
        <div
          className="flex w-10 items-end overflow-hidden rounded-full bg-white/10"
          style={{ height: barHeight }}
        >
          <motion.div
            className="w-full rounded-full bg-[#ffa116]"
            initial={{ height: 0 }}
            animate={{ height: `${(solved / max) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/leetcode.svg" alt="LeetCode" className="h-5 w-5 grayscale invert" />
        <div className="text-[10px] uppercase tracking-wide text-white/45">
          Solved
        </div>
      </div>
    </div>
  );
}
