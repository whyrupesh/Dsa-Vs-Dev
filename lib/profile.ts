import { getGitHubStats, GitHubNotFoundError, type GitHubStats } from "./github";
import { getLeetCodeStats, LeetCodeNotFoundError, type LeetCodeStats } from "./leetcode";
import { computeScore, type ShipSolveScore } from "./score";

export interface Profile {
  github: GitHubStats;
  leetcode: LeetCodeStats;
  score: ShipSolveScore;
}

export class ProfileNotFoundError extends Error {
  constructor(public field: "github" | "leetcode", message: string) {
    super(message);
  }
}

export async function getProfile(
  githubUsername: string,
  leetcodeUsername: string
): Promise<Profile> {
  const [github, leetcode] = await Promise.all([
    getGitHubStats(githubUsername).catch((e) => {
      if (e instanceof GitHubNotFoundError) {
        throw new ProfileNotFoundError("github", e.message);
      }
      throw e;
    }),
    getLeetCodeStats(leetcodeUsername).catch((e) => {
      if (e instanceof LeetCodeNotFoundError) {
        throw new ProfileNotFoundError("leetcode", e.message);
      }
      throw e;
    }),
  ]);

  return { github, leetcode, score: computeScore(github, leetcode) };
}
