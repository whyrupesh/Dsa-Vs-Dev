import React, { useRef } from "react";
import BarGraph from "./BarGraph";
import { FiTwitter, FiClipboard, FiDownload } from "react-icons/fi"; // Using React Icons
import * as htmlToImage from "html-to-image";

export default function ProfileResult({
  username,
  submissions,
  commits,
  imgurl,
}) {
  const cardRef = useRef(null);

  // Function to copy the card as image to clipboard
  const handleCopyAsImage = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        width: cardRef.current.offsetWidth, // Explicit width
        height: cardRef.current.offsetHeight, // Explicit height
      });
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      alert("Profile card copied as image!");
    } catch (err) {
      console.error("Error copying image to clipboard", err);
      alert("Failed to copy the image.");
    }
  };

  // Function to download the card as image
  const handleDownloadImage = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${username}_profile_card.png`;
      link.click();
    } catch (err) {
      console.error("Error downloading image", err);
      alert("Failed to download the image.");
    }
  };

  // Function to share the profile on Twitter
  const handleShareOnTwitter = () => {
    const comparison =
      commits > submissions
        ? Math.round(((commits - submissions) / submissions) * 100)
        : Math.round(((submissions - commits) / commits) * 100);

    const activity =
      commits > submissions
        ? "Commiting on Github"
        : "Problem-solving on LeetCode";
    const lessActivity =
      commits < submissions ? "developing" : "Problem-solving on LeetCode";

    // Construct the tweet text
    const tweetText = `${username} spends ${comparison}% more time ${activity} than ${lessActivity}.`;

    // Get the current page URL
    const pageUrl = window.location.href;

    // Construct Twitter share URL with a line break before the URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}%0A${encodeURIComponent(pageUrl)}`;

    // Open the Twitter share URL in a new tab
    window.open(twitterUrl, "_blank");
  };

  return (
    <>
      <div
        className="border rounded-xl p-4 shadow-lg bg-white w-11/12  md:max-w-lg mx-auto"
        style={{ width: "fit-content", margin: "auto" }} // Ensures correct width for capture
      >
        <div
          ref={cardRef}
          className="p-3 border rounded-xl shadow-lg bg-white w-11/12  md:max-w-lg mx-auto mb-2"
        >
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
          <a
            className="text-xs font-thin"
            href="https://comparecode.vercel.app/"
          >
            https://comparecode.vercel.app/
          </a>
          <p className="text-gray-700 text-sm mb-4">
            {username} spends{" "}
            <span className="font-bold">
              {commits > submissions
                ? Math.round(((commits - submissions) / submissions) * 100)
                : Math.round(((submissions - commits) / commits) * 100)}
              %{" "}
            </span>
            more time{" "}
            <span className="underline">
              {commits > submissions ? "developing" : "problem-solving"}
            </span>{" "}
            than{" "}
            <span className="underline">
              {commits < submissions ? "developing" : "problem-solving"}
            </span>
            .
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-4">
          {/* Share on Twitter Button */}
          <button
            onClick={handleShareOnTwitter}
            className="flex items-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <FiTwitter className="mr-2" />
            Tweet
          </button>

          {/* Copy Image to Clipboard Button */}
          <button
            onClick={handleCopyAsImage}
            className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <FiClipboard className="mr-2" />
            Copy as Image
          </button>

          {/* Download Image Button */}
          <button
            onClick={handleDownloadImage}
            className="flex items-center px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <FiDownload className="mr-2" />
            Download Image
          </button>
        </div>
      </div>
    </>
  );
}
