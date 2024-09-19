import React, { useState } from "react";
import axios from "axios";

function DemoResult() {
  const [githubUsername, setGithubUsername] = useState("");
  const [leetCodeUsername, setLeetCodeUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/?githubUsername=${githubUsername}&leetCodeUsername=${leetCodeUsername}`
      );
      setResult(response.data);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          GitHub vs LeetCode Comparison
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="Enter GitHub Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LeetCode Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={leetCodeUsername}
              onChange={(e) => setLeetCodeUsername(e.target.value)}
              placeholder="Enter LeetCode Username"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full p-3 text-white font-bold bg-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Compare"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Comparison Results:
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>GitHub Commits:</strong> {result.githubCommits}
            </p>
            <p className="text-gray-700 mt-2">
              <strong>LeetCode Submissions:</strong>{" "}
              {result.leetCodeSubmissions}
            </p>

            <h3 className="mt-4 text-lg font-bold text-gray-800">
              {result.githubCommits > result.leetCodeSubmissions
                ? "More Development Work"
                : "More DSA Work"}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoResult;
