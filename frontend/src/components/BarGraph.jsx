import React from "react";

const BarGraph = ({ commits, submissions }) => {
  const maxValue = Math.max(commits, submissions);
  const maxHeight = 100;
  return (
    <div className="flex items-end justify-around w-20 mx-auto mt-10">
      <div className="flex flex-col items-center">
        {/* GitHub Icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="GitHub Icon"
          className="w-4 h-4 mb-2"
        />
        {/* Green Bar */}
        <div
          className="w-6 bg-green-500"
          style={{ height: `${(commits / maxValue) * maxHeight}px` }}
        ></div>
      </div>
      <div className="flex flex-col items-center">
        {/* Leetcode Icon */}
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-4-pack-logos-icons-2944960.png?f=webp&w=256"
          alt="Twitter Icon"
          className="w-4 h-4 mb-2"
        />
        {/* Orange Bar */}
        <div
          className="w-6 bg-orange-400"
          style={{ height: `${(submissions / maxValue) * maxHeight}px` }}
        ></div>
      </div>
    </div>
  );
};

export default BarGraph;
