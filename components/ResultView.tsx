"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { FiTwitter, FiClipboard, FiDownload, FiLink } from "react-icons/fi";
import type { Profile } from "@/lib/profile";
import { ShareCard } from "./ShareCard";

export function ResultView({
  profile,
  githubUsername,
  leetcodeUsername,
}: {
  profile: Profile;
  githubUsername: string;
  leetcodeUsername: string;
}) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const flash = (message: string) => {
    setStatus(message);
    setTimeout(() => setStatus(null), 2200);
  };

  // Captures the hidden, always-horizontal card rather than the visible one,
  // since the visible card stacks vertically on narrow viewports for usability.
  const captureCard = () => htmlToImage.toPng(captureRef.current!, { pixelRatio: 2 });

  const handleDownload = async () => {
    try {
      const dataUrl = await captureCard();
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${githubUsername}-comparecode.png`;
      link.click();
    } catch {
      flash("Couldn't download the image.");
    }
  };

  const handleCopyImage = async () => {
    try {
      const dataUrl = await captureCard();
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      flash("Card copied to clipboard!");
    } catch {
      flash("Couldn't copy the image — try downloading instead.");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Link copied!");
    } catch {
      flash("Couldn't copy the link.");
    }
  };

  const handleTweet = () => {
    const { shipPercent, solvePercent, verdict } = profile.score;
    const lead = shipPercent >= solvePercent ? "shipping" : "solving";
    const text = `I'm ${Math.max(shipPercent, solvePercent)}% more into ${lead} on @comparecode. ${verdict} confirmed 👀`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const buttonClass =
    "flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur-xl transition hover:bg-white/[0.12] hover:text-white";

  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ShareCard
          profile={profile}
          githubUsername={githubUsername}
          leetcodeUsername={leetcodeUsername}
        />
      </motion.div>

      {/* Off-screen, always-horizontal clone used only for download/copy-image.
          It needs its own opaque dark backdrop — backdrop-blur has nothing to
          sample off-screen, since the page's fixed AnimatedBackground only
          covers the actual viewport rectangle. */}
      <div style={{ position: "fixed", left: -9999, top: 0, pointerEvents: "none" }} aria-hidden>
        <div
          style={{
            width: 700,
            padding: 32,
            background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          }}
        >
          <ShareCard
            ref={captureRef}
            profile={profile}
            githubUsername={githubUsername}
            leetcodeUsername={leetcodeUsername}
            forceHorizontal
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={handleTweet} className={buttonClass}>
          <FiTwitter /> Tweet
        </button>
        <button onClick={handleCopyImage} className={buttonClass}>
          <FiClipboard /> Copy image
        </button>
        <button onClick={handleDownload} className={buttonClass}>
          <FiDownload /> Download
        </button>
        <button onClick={handleCopyLink} className={buttonClass}>
          <FiLink /> Copy link
        </button>
      </div>

      <div className="h-5 text-xs text-white/70">{status}</div>
    </main>
  );
}
