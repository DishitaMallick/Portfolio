// src/App.jsx

import { useEffect } from "react";



import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import DesignProcess from "./components/DesignProcess";
import Contact from "./components/Contact";

import "./index.css";

function App() {

 /* CURSOR GLOW */

  useEffect(() => {

    const glow = document.querySelector(".cursor-glow");

    const moveGlow = (e) => {

      glow.style.left = `${e.clientX}px`;

      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveGlow);

    return () => {
      window.removeEventListener("mousemove", moveGlow);
    };

  }, []);

  return (
    <>

      {/* AMBIENT BLOBS */}

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* CURSOR GLOW */}

      <div className="cursor-glow"></div>

      {/* MAIN */}

      <Navbar />

      <Hero />

      <About />

      <Projects />

      <DesignProcess />

      <Contact />

    </>
  );
}

export default App;