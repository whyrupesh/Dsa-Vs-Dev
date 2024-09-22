import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InputUser() {
  const [githubUsername, setGithubUsername] = useState("");
  const [leetCodeUsername, setLeetCodeUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Navigate to the profile result page with query parameters
      navigate(
        `/profile?githubUsername=${githubUsername}&leetCodeUsername=${leetCodeUsername}`
      );
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col max-w-screen-sm items-center space-y-4">
          <div className="flex space-x-3">
            <div className="flex items-center">
              <FiGithub size={25} />
            </div>
            <div>
              <input
                type="text"
                id="github_name"
                className="bg-gray-100 border font-medium border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="GitHub Username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="flex items-center">
              <SiLeetcode size={25} />
            </div>
            <div>
              <input
                type="text"
                id="leetcode_name"
                className="bg-gray-100 border font-medium border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="LeetCode Username"
                value={leetCodeUsername}
                onChange={(e) => setLeetCodeUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </form>
    </>
  );
}
