import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProfileResult from "./ProfileResult";

// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function ProfileResultPage() {
  const query = useQuery();
  const githubUsername = query.get("githubUsername");
  const leetCodeUsername = query.get("leetCodeUsername");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:3000/?githubUsername=${githubUsername}&leetCodeUsername=${leetCodeUsername}`
        );
        setResult(response.data);
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (githubUsername && leetCodeUsername) {
      fetchData(); // Fetch only when both usernames are available
    }
  }, [githubUsername, leetCodeUsername]); // Fetch data when usernames change

  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Profile Results for {githubUsername}
      </h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {result && (
        <ProfileResult
          username={githubUsername}
          submissions={result.leetCodeSubmissions}
          commits={result.githubCommits}
          imgurl={
            "https://assets.leetcode.com/users/avatars/avatar_1674151562.png"
          } // Static example, can change dynamically if needed
        />
      )}
    </div>
  );
}
