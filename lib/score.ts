import type { GitHubStats } from "./github";
import type { LeetCodeStats } from "./leetcode";

export interface ShipSolveScore {
  shipPercent: number;
  solvePercent: number;
  verdict: string;
}

const VERDICTS: { min: number; label: string }[] = [
  { min: 80, label: "The Shipper" },
  { min: 60, label: "Builder-Leaning" },
  { min: 40, label: "Balanced Builder" },
  { min: 20, label: "Solver-Leaning" },
  { min: 0, label: "The Solver" },
];

export function computeScore(
  github: GitHubStats,
  leetcode: LeetCodeStats
): ShipSolveScore {
  const ship = github.totalContributions;
  const solve = leetcode.totalSolved;
  const total = ship + solve;

  const shipPercent = total === 0 ? 50 : Math.round((ship / total) * 100);
  const solvePercent = 100 - shipPercent;

  const verdict = VERDICTS.find((v) => shipPercent >= v.min)!.label;

  return { shipPercent, solvePercent, verdict };
}
