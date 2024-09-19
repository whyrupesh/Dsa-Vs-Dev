import React from "react";

export default function Navigation() {
  return (
    <div className="p-10 mx-auto flex max-w-screen-lg items-center justify-between">
      <div className="text-red-800">WebsiteName</div>
      <div className="flex space-x-12">
        <div>Github</div>
        <div>Twitter</div>
      </div>
    </div>
  );
}
