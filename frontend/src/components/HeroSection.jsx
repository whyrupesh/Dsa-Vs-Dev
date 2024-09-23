import React from "react";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { IoCodeSlash } from "react-icons/io5";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col w-full max-w-screen-sm items-center justify-center gap-4 py-4">
        {/* icons */}
        <div className="flex justify-between mt-20">
          <img className="w-14" src="./github.svg" alt="github icon" />
          <div className="flex items-center">
            <img src="" alt="" />
            <IoCodeSlash size={20} className="m-5" />
          </div>
          <img className="w-14" src="./leetcode.svg" alt="leetcode img" />
        </div>
        {/* title */}
        <div className="font-bold">DSA-vs-DEV</div>
        <p className="w-3/4 text-center text-gray-600 ">
          Find out whether you spend more time making cool projects or solving
          problems on leetcode.
        </p>
      </div>
    </div>
  );
}
