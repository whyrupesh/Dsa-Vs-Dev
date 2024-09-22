import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { IoCodeSlash } from "react-icons/io5";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <>
      <div className="p-5 mx-auto flex max-w-screen-lg items-center justify-between ">
        <div
          onClick={() => navigate("/")}
          className="text-black text-xl fontsix cursor-pointer font-extrabold"
        >
          CompareCode
        </div>
        <div className="flex space-x-12">
          {/* github */}
          <a
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-700 disabled:pointer-events-none disabled:opacity-50"
            target="_blank"
            href="https://github.com/whyrupesh/Dsa-Vs-Dev"
          >
            <svg
              className="h-4 w-4 md:mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span className="hidden md:block">Star on GitHub</span>
          </a>
          <a
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
            target="_blank"
            href="https://twitter.com/intent/follow?screen_name=whyrupesh"
          >
            <svg
              className="h-4 w-4 md:mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="hidden md:block">Follow me on Twitter</span>
          </a>
        </div>
      </div>
      <hr className="shadow-lg	" />
    </>
  );
}
