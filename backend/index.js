const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
require('dotenv').config();


const token = process.env.GITHUB_TOKEN;


// Enable CORS
app.use(cors());

// LeetCode API Call
async function getLeetCodeSubmissions(username) {
  try {
    const response = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    const totalSubmissions = response.data.totalSubmissions[0].submissions; 
    return totalSubmissions;
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.response ? error.response.data : error.message);
    throw new Error('LeetCode API failed');
  }
}

// GitHub API Call - Get number of commits in a repo
async function getNumOfCommits(githubUsername, repo) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${githubUsername}/${repo}/commits?per_page=10000`, {
      headers: {
        'Authorization': `Bearer ${token}` // Use 'Bearer' format
      }
    });
    return response.data.length;
  } catch (error) {
    console.error(`Error fetching commits for ${repo}:`, error.response ? error.response.data : error.message);
    throw new Error(`Failed to get commits for repo: ${repo}`);
  }
}

// Get total number of commits across all repositories using parallel requests
async function getAllCommits(githubUsername) {
  try {
    const response = await axios.get(`https://api.github.com/users/${githubUsername}/repos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const repos = response.data;

    // Create an array of promises to get commit counts for all repos concurrently
    const commitPromises = repos.map(repo => getNumOfCommits(githubUsername, repo.name));

    // Wait for all promises to resolve
    const commitsArray = await Promise.all(commitPromises);

    // Calculate total commits
    const totalCommits = commitsArray.reduce((sum, commits) => sum + commits, 0);

    return totalCommits;
  } catch (error) {
    console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
    throw new Error('GitHub API failed');
  }
}

// Main route handler
app.get('/', async (req, res) => {
  try {
    const githubUsername = req.query.githubUsername; // Get GitHub username from query param
    const leetCodeUsername = req.query.leetCodeUsername; // Get LeetCode username from query param

    if (!githubUsername || !leetCodeUsername) {
      return res.status(400).json({ error: "Both GitHub and LeetCode usernames are required." });
    }

    const [leetCodeSubmissions, githubCommits] = await Promise.all([
      getLeetCodeSubmissions(leetCodeUsername),
      getAllCommits(githubUsername)
    ]);

    res.json({
      leetCodeSubmissions,
      githubCommits
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

