// src/App.jsx

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import FrontendSkills from "./components/FrontendSkills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

import "./index.css";

const MainPortfolio = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <FrontendSkills />
    <Experience />
    <Contact />
  </>
);

function App() {
  /* CURSOR GLOW */
  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");

    const moveGlow = (e) => {
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };
  }, []);

  return (
    <div className="site-wrapper">
      {/* AMBIENT BLOBS */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* CURSOR GLOW */}
      <div className="cursor-glow"></div>

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      {/* ROUTING */}
      <Routes>
        <Route path="*" element={<MainPortfolio />} />
      </Routes>
    </div>
  );
}

export default App;