"use client";

import { forwardRef } from "react";
import type { Profile } from "@/lib/profile";
import { CountUp } from "./CountUp";
import { SplitBar } from "./SplitBar";
import { StatBadge } from "./StatBadge";
import { MetricBars } from "./MetricBars";

interface ShareCardProps {
  profile: Profile;
  githubUsername: string;
  leetcodeUsername: string;
  /** Forces the wide/horizontal layout regardless of viewport — used for the
   * hidden off-screen card that download/copy-image capture, since Tailwind's
   * `sm:` breakpoints respond to the real viewport, not this element's width. */
  forceHorizontal?: boolean;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  function ShareCard(
    { profile, githubUsername, leetcodeUsername, forceHorizontal = false },
    ref
  ) {
    const { github, leetcode, score } = profile;

    return (
      <div
        ref={ref}
        className={
          "relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl " +
          (forceHorizontal
            // backdrop-filter isn't supported by html-to-image's static capture,
            // so the export variant uses an opaque background instead of glass.
            ? "bg-[#141414] p-8"
            : "bg-white/[0.06] backdrop-blur-2xl sm:p-8")
        }
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-gray-400/10 blur-3xl" />

        {/* header */}
        <div className="relative flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={github.avatarUrl}
            alt={githubUsername}
            width={64}
            height={64}
            crossOrigin="anonymous"
            className="h-16 w-16 rounded-full border-2 border-white/20"
          />
          <div>
            <div className="text-lg font-semibold text-white">
              {github.name ?? githubUsername}
            </div>
            <div className="flex gap-3 text-xs text-white/50">
              <span>@{githubUsername}</span>
              <span>@{leetcodeUsername}</span>
            </div>
          </div>
        </div>

        {/* headline + bar chart, side by side on wider screens */}
        <div
          className={
            "relative mt-6 flex gap-6 " +
            (forceHorizontal
              ? "flex-row items-center justify-between"
              : "flex-col sm:flex-row sm:items-center sm:justify-between")
          }
        >
          <div className={forceHorizontal ? "max-w-[280px]" : "sm:max-w-[280px]"}>
            <div className="text-4xl font-bold tracking-tight text-white">
              <CountUp value={score.shipPercent} />%{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Shipper
              </span>
            </div>
            <div className="mt-1 text-sm text-white/60">
              vs <CountUp value={score.solvePercent} />%{" "}
              <span className="text-white/80">Solver</span> &middot;{" "}
              {score.verdict}
            </div>
            <div className="mt-4">
              <SplitBar
                shipPercent={score.shipPercent}
                solvePercent={score.solvePercent}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <MetricBars
              commits={github.totalContributions}
              solved={leetcode.totalSolved}
            />
          </div>
        </div>

        {/* stats grid */}
        <div
          className={
            "relative mt-6 grid gap-2 " +
            (forceHorizontal ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4")
          }
        >
          <StatBadge label="Streak" value={`${github.currentStreak}d`} />
          <StatBadge label="Stars" value={github.totalStars} />
          <StatBadge label="Top Lang" value={github.topLanguage ?? "—"} />
          <StatBadge
            label="LC Rank"
            value={leetcode.ranking ? `#${leetcode.ranking.toLocaleString("en-US")}` : "—"}
          />
        </div>

        {/* footer */}
        <div className="relative mt-6 flex items-center justify-between text-[11px] text-white/40">
          <span className="font-medium">comparecode.app</span>
          <span>
            Easy {leetcode.easySolved} &middot; Med {leetcode.mediumSolved}{" "}
            &middot; Hard {leetcode.hardSolved}
          </span>
        </div>
      </div>
    );
  }
);
