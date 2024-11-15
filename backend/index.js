const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

const token = process.env.GITHUB_TOKEN;

app.use(cors());

// LeetCode API Call
async function getLeetCodeSubmissions(username) {
  try {
    const response = await axios.get(
      `https://leetcode-api-faisalshohag.vercel.app/${username}`
    );
    const totalSubmissions = response.data.totalSubmissions[0].submissions;
    return totalSubmissions;
  } catch (error) {
    console.error(
      "Error fetching LeetCode data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("LeetCode API failed");
  }
}

// GitHub API Call - Get number of commits in a repo
async function getNumOfCommits(githubUsername, repo) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${githubUsername}/${repo}/commits?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.length;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.warn(`Repository ${repo} is empty.`);
      return 0; // Return 0 commits for an empty repository
    }
    console.error(
      `Error fetching commits for ${repo}:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(`Failed to get commits for repo: ${repo}`);
  }
}

async function getAllCommits(githubUsername) {
  try {
    console.log("api hit");
    const response = await axios.get(
      `https://api.github.com/users/${githubUsername}/repos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const repos = response.data;
    const commitPromises = repos.map((repo) =>
      getNumOfCommits(githubUsername, repo.name)
    );
    const commitsArray = await Promise.all(commitPromises);
    const totalCommits = commitsArray.reduce(
      (sum, commits) => sum + commits,
      0
    );
    return totalCommits;
  } catch (error) {
    console.error(
      "Error fetching repositories:",
      error.response ? error.response.data : error.message
    );
    throw new Error("GitHub API failed");
  }
}

app.get("/", async (req, res) => {
  try {
    const githubUsername = req.query.githubUsername;
    const leetCodeUsername = req.query.leetCodeUsername;

    if (!githubUsername || !leetCodeUsername) {
      return res
        .status(400)
        .json({ error: "Both GitHub and LeetCode usernames are required." });
    }

    // Check for If-None-Match header to see if the client already has the cached version
    const clientETag = req.headers["if-none-match"];

    // Simulating a hash-based ETag
    const uniqueIdentifier = `${githubUsername}-${leetCodeUsername}`;
    const currentETag = `W/"${Buffer.from(uniqueIdentifier).toString(
      "base64"
    )}"`;

    if (clientETag === currentETag) {
      // ETag matches, return 304 Not Modified
      return res.status(304).end();
    }

    // Fetch data from GitHub and LeetCode
    const [leetCodeSubmissions, githubCommits] = await Promise.all([
      getLeetCodeSubmissions(leetCodeUsername),
      getAllCommits(githubUsername),
    ]);

    // Set ETag in the response and cache headers
    res.set("ETag", currentETag);
    res.set("Cache-Control", "public, max-age=60"); // Cache for 60 seconds

    res.json({
      leetCodeSubmissions,
      githubCommits,
    });
  } catch (error) {
    console.error("Error in route handler:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully running and listening on port ${PORT}`);
  } else {
    console.error("Error occurred, server can't start", error);
  }
});
