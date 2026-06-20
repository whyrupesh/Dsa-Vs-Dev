import { cached } from "./cache";

export interface GitHubStats {
  login: string;
  name: string | null;
  avatarUrl: string;
  totalContributions: number;
  currentStreak: number;
  totalStars: number;
  repoCount: number;
  topLanguage: string | null;
}

export class GitHubNotFoundError extends Error {}

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: [OWNER], isFork: false) {
        totalCount
        nodes {
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

function currentStreak(weeks: { contributionDays: { date: string; contributionCount: number }[] }[]) {
  const days = weeks.flatMap((w) => w.contributionDays);
  let streak = 0;
  // Walk backwards from today; allow today to be empty (day not over yet) without breaking the streak.
  for (let i = days.length - 1; i >= 0; i--) {
    const isLastDay = i === days.length - 1;
    if (days[i].contributionCount > 0) {
      streak++;
    } else if (!isLastDay) {
      break;
    }
  }
  return streak;
}

function topLanguageOf(nodes: { primaryLanguage: { name: string } | null }[]) {
  const counts = new Map<string, number>();
  for (const node of nodes) {
    const lang = node.primaryLanguage?.name;
    if (!lang) continue;
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [lang, count] of counts) {
    if (count > bestCount) {
      best = lang;
      bestCount = count;
    }
  }
  return best;
}

async function fetchGitHubStats(login: string): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is not configured on the server");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API request failed with status ${res.status}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    const notFound = json.errors.some((e: { type?: string }) => e.type === "NOT_FOUND");
    if (notFound) {
      throw new GitHubNotFoundError(`GitHub user "${login}" not found`);
    }
    throw new Error(`GitHub GraphQL error: ${json.errors[0]?.message ?? "unknown error"}`);
  }
  if (!json.data?.user) {
    throw new GitHubNotFoundError(`GitHub user "${login}" not found`);
  }

  const user = json.data.user;
  const calendar = user.contributionsCollection.contributionCalendar;
  const repoNodes = user.repositories.nodes as {
    stargazerCount: number;
    primaryLanguage: { name: string } | null;
  }[];

  return {
    login,
    name: user.name ?? null,
    avatarUrl: user.avatarUrl,
    totalContributions: calendar.totalContributions,
    currentStreak: currentStreak(calendar.weeks),
    totalStars: repoNodes.reduce((sum, r) => sum + r.stargazerCount, 0),
    repoCount: user.repositories.totalCount,
    topLanguage: topLanguageOf(repoNodes),
  };
}

export function getGitHubStats(login: string): Promise<GitHubStats> {
  return cached(`github:${login.toLowerCase()}`, 10 * 60 * 1000, () =>
    fetchGitHubStats(login)
  );
}
