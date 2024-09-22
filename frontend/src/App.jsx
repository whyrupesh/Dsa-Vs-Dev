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
import DemoResult from "./components/DemoResult";

function App() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <InputUser />
    </>
  );
}

export default App;
