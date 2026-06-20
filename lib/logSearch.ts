import { prisma } from "./prisma";

/** Best-effort: records a searched username pair. Never throws — a logging
 * failure shouldn't affect the page. */
export async function logSearch(githubUsername: string, leetcodeUsername: string) {
  try {
    await prisma.search.create({
      data: { githubUsername, leetcodeUsername },
    });
  } catch (error) {
    console.error("Failed to log search:", error);
  }
}
