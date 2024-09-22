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
import Home from "./components/Home";
import ProfileResultPage from "./components/ProfileResultPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileResultPage />} />
      </Routes>
    </>
  );
}

export default App;
