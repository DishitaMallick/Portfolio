// src/App.jsx

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import DesignProcess from "./components/DesignProcess";
import Experience from "./components/Experience";

import HumanBento from "./components/HumanBento";
import Contact from "./components/Contact";

import "./index.css";

function App() {
  const [mode, setMode] = useState("designer");

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

  /* SYNC BODY CLASS FOR BACKGROUND TRANSITIONS */
  useEffect(() => {
    document.body.classList.remove("designer", "human");
    document.body.classList.add(mode);
  }, [mode]);

  return (
    <div className={`site-wrapper ${mode}`}>

      {/* AMBIENT BLOBS */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* CURSOR GLOW */}
      <div className="cursor-glow"></div>

      {/* NAVBAR */}
      <Navbar
        mode={mode}
        setMode={setMode}
      />

      {/* HERO */}
      <Hero mode={mode} />

      {/* DYNAMIC CONTENT TRANSITION */}
      <AnimatePresence mode="wait">
        {mode === "designer" ? (
          <motion.div
            key="designer-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <About />
            <Projects />
            <DesignProcess />
            <Experience />

          </motion.div>
        ) : (
          <motion.div
            key="human-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <HumanBento />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTACT */}
      <Contact mode={mode} />
    </div>
  );
}

export default App;