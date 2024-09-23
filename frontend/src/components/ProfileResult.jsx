//card
import React from "react";
import BarGraph from "./BarGraph";
import { FiTwitter, FiClipboard } from "react-icons/fi"; // Using React Icons

export default function ProfileResult({
  username,
  submissions,
  commits,
  imgurl,
}) {
  // Function to copy the profile data to clipboard
  const handleCopyToClipboard = () => {
    const text = `${username}: ${commits} commits, ${submissions} submissions`;
    navigator.clipboard.writeText(text);
    alert("Profile info copied to clipboard!");
  };

  // Function to share the profile on Twitter
  const handleShareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=Check out ${username}'s profile with ${commits} commits and ${submissions} submissions!`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="border rounded-xl p-4 shadow-lg bg-white w-11/12  md:max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 items-center">
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img
                src={imgurl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Username and Stats */}
            <div>
              <div className="font-bold text-lg">{username}</div>
              <div className="text-gray-500 flex">
                {" "}
                <img className="w-5 mr-2" src="./github.svg" alt="" />
                {commits} commits
              </div>
              <div className="text-gray-500 flex">
                <img className="w-5 mr-2" src="./leetcode.svg" alt="" />
                {submissions} submissions
              </div>
            </div>
          </div>
          {/* Bar Graph */}
          <div className="items-end mr-3">
            <BarGraph commits={commits} submissions={submissions} />
          </div>
        </div>

        {/* Comparison Text */}
        <p className="text-gray-700 text-sm mb-4">
          {username} spends{" "}
          <span className="font-bold">
            {commits > submissions
              ? Math.round(((commits - submissions) / submissions) * 100)
              : Math.round(((submissions - commits) / commits) * 100)}
            %{" "}
          </span>
          more time {commits > submissions ? "developing" : "problem-solving"}{" "}
          than {commits < submissions ? "developing" : "problem-solving"}.
        </p>

        {/* Buttons Section */}
        <div className="flex space-x-4">
          {/* Copy to Clipboard Button */}
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <FiClipboard className="mr-2" />
            Copy to Clipboard
          </button>

          {/* Share on Twitter Button */}
          <button
            onClick={handleShareOnTwitter}
            className="flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FiTwitter className="mr-2" />
            Tweet
          </button>
        </div>
      </div>
    </>
  );
}
