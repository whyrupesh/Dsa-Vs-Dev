import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="p-10 mx-auto flex max-w-screen-lg items-center justify-between ">
      <div
        onClick={() => navigate("/")}
        className="text-red-800 cursor-pointer"
      >
        WebsiteName
      </div>
      <div className="flex space-x-12">
        <div>Github</div>
        <div>Twitter</div>
      </div>
    </div>
  );
}
