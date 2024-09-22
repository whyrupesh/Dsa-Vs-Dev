import React from "react";
import HeroSection from "./HeroSection";
import Navigation from "./Navigation";
import InputUser from "./InputUser";
export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="flex">
        <div className="ml-auto mr-auto">
          <InputUser />
        </div>
      </div>
    </>
  );
}
