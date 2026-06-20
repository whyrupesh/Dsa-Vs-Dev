"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function UsernameForm() {
  const router = useRouter();
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gh = githubUsername.trim();
    const lc = leetcodeUsername.trim();
    if (!gh || !lc) return;

    setSubmitting(true);
    router.push(`/u/${encodeURIComponent(gh)}/${encodeURIComponent(lc)}`);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="flex w-full max-w-md flex-col gap-3"
    >
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl transition focus-within:border-white/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/github.svg" alt="" className="h-5 w-5 invert grayscale" />
        <input
          type="text"
          placeholder="GitHub username"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          required
          className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
        />
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl transition focus-within:border-white/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/leetcode.svg" alt="" className="h-5 w-5 grayscale invert" />
        <input
          type="text"
          placeholder="LeetCode username"
          value={leetcodeUsername}
          onChange={(e) => setLeetcodeUsername(e.target.value)}
          required
          className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:opacity-50"
      >
        {submitting ? "Crunching your stats…" : "Reveal my card"}
      </button>
    </motion.form>
  );
}
