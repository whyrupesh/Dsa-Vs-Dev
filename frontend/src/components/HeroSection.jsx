import React from "react";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { IoCodeSlash } from "react-icons/io5";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full max-w-screen-sm items-center justify-center gap-4 py-4">
        {/* icons */}
        <div className="flex justify-between">
          <div>
            <FiGithub size={60} />
          </div>
          <div className="flex items-center">
            <IoCodeSlash size={20} className="m-5" />
          </div>
          <div>
            <SiLeetcode size={60} />
          </div>
        </div>
        {/* title */}
        <div>CompareCode</div>
        <p className="w-3/4 text-center">
          Find out whether you spend more time making cool projects or solving
          problems on leetcode
        </p>
      </div>
    </div>
  );
}
