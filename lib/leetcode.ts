import { cached } from "./cache";

export interface LeetCodeStats {
  username: string;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export class LeetCodeNotFoundError extends Error {}

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/${username}/`,
      "User-Agent": "Mozilla/5.0 (compatible; ComparecodeBot/1.0)",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { username },
      operationName: "getUserProfile",
    }),
  });

  if (!res.ok) {
    throw new Error(`LeetCode API request failed with status ${res.status}`);
  }

  const json = await res.json();
  const user = json.data?.matchedUser;
  if (!user) {
    throw new LeetCodeNotFoundError(`LeetCode user "${username}" not found`);
  }

  const byDifficulty = new Map<string, number>(
    (user.submitStatsGlobal.acSubmissionNum as { difficulty: string; count: number }[]).map(
      (d) => [d.difficulty, d.count]
    )
  );

  return {
    username,
    ranking: user.profile?.ranking ?? null,
    totalSolved: byDifficulty.get("All") ?? 0,
    easySolved: byDifficulty.get("Easy") ?? 0,
    mediumSolved: byDifficulty.get("Medium") ?? 0,
    hardSolved: byDifficulty.get("Hard") ?? 0,
  };
}

export function getLeetCodeStats(username: string): Promise<LeetCodeStats> {
  return cached(`leetcode:${username.toLowerCase()}`, 10 * 60 * 1000, () =>
    fetchLeetCodeStats(username)
  );
}
