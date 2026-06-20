"use client";

import { motion } from "framer-motion";

export function SplitBar({
  shipPercent,
  solvePercent,
}: {
  shipPercent: number;
  solvePercent: number;
}) {
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: `${shipPercent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="h-full bg-gray-500"
        initial={{ width: 0 }}
        animate={{ width: `${solvePercent}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      />
    </div>
  );
}
