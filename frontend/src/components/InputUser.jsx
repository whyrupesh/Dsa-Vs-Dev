import React from "react";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { useState } from "react";

export default function InputUser() {
  const [githubUsername, setGithubUsername] = useState("");
  const [leetCodeUsername, setLeetCodeUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <form action="">
        <div className="flex flex-col max-w-screen-sm items-center space-y-4">
          <div className="flex space-x-3">
            <div className="flex items-center">
              <FiGithub size={25} />
            </div>
            <div>
              <input
                type="text"
                id="last_name"
                className="bg-gray-100 border font-medium border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="GitHub Profile Name"
                value={githubUsername}
                onChange={(e) => {
                  setGithubUsername(e.target.value);
                }}
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
                id="last_name"
                className="bg-gray-100 border font-medium border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="LeetCode Profile Name"
                value={leetCodeUsername}
                onChange={(e) => {
                  setLeetCodeUsername(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
