import type { Metadata } from "next";
import { after } from "next/server";
import Link from "next/link";
import { getProfile, ProfileNotFoundError, type Profile } from "@/lib/profile";
import { logSearch } from "@/lib/logSearch";
import { ResultView } from "@/components/ResultView";

interface Params {
  github: string;
  leetcode: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { github, leetcode } = await params;
  return {
    title: `${github} — Shipper or Solver? · compareCode`,
    description: `See whether ${github} ships more on GitHub or solves more on LeetCode (${leetcode}).`,
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { github, leetcode } = await params;

  after(() => logSearch(github, leetcode));

  let profile: Profile | null = null;
  let errorMessage: string | null = null;

  try {
    profile = await getProfile(github, leetcode);
  } catch (err) {
    const field = err instanceof ProfileNotFoundError ? err.field : null;
    const missingUsername = field === "leetcode" ? leetcode : github;
    errorMessage =
      field !== null
        ? `We couldn't find the ${field === "github" ? "GitHub" : "LeetCode"} username "${missingUsername}".`
        : "Something went wrong fetching these stats. Please try again in a moment.";
  }

  if (errorMessage || !profile) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <div className="text-2xl font-semibold">That didn&apos;t work</div>
        <p className="max-w-sm text-sm text-white/60">{errorMessage}</p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
        >
          Try another username
        </Link>
      </main>
    );
  }

  return (
    <ResultView
      profile={profile}
      githubUsername={github}
      leetcodeUsername={leetcode}
    />
  );
}
