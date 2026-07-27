import { prisma } from "./prisma";
import type { Profile } from "./profile";

/** Best-effort: records a searched username pair, plus the resulting stats
 * when the lookup succeeded. Never throws — a logging failure shouldn't
 * affect the page. */
export async function logSearch(
  githubUsername: string,
  leetcodeUsername: string,
  profile: Profile | null
) {
  try {
    await prisma.search.create({
      data: {
        githubUsername,
        leetcodeUsername,
        ...(profile && {
          githubTotalContributions: profile.github.totalContributions,
          githubCurrentStreak: profile.github.currentStreak,
          githubTotalStars: profile.github.totalStars,
          githubRepoCount: profile.github.repoCount,
          githubTopLanguage: profile.github.topLanguage,

          leetcodeRanking: profile.leetcode.ranking,
          leetcodeTotalSolved: profile.leetcode.totalSolved,
          leetcodeEasySolved: profile.leetcode.easySolved,
          leetcodeMediumSolved: profile.leetcode.mediumSolved,
          leetcodeHardSolved: profile.leetcode.hardSolved,

          shipPercent: profile.score.shipPercent,
          solvePercent: profile.score.solvePercent,
          verdict: profile.score.verdict,
        }),
      },
    });
  } catch (error) {
    console.error("Failed to log search:", error);
  }
}
