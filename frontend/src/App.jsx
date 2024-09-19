// src/App.js
//shiptalkers.dev

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import InputUser from "./components/InputUser";
import ProfileResult from "./components/ProfileResult";
import BarGraph from "./components/BarGraph";

function App() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <InputUser />

      <ProfileResult
        username={"whyrupesh"}
        submissions={142}
        commits={488}
        imgurl={
          "https://assets.leetcode.com/users/avatars/avatar_1674151562.png"
        }
      />
      <BarGraph number1={50} number2={100} />
    </>
  );
}

export default App;
