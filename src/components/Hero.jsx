// src/components/Hero.jsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/hero.css";

const titles = [
  "UI/UX Designer",
  "Frontend Developer",
  "Product Designer",
  "AI/ML Engineer",
  "Interaction Designer",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* LEFT CONTENT */}
      <motion.div
        className="hero-left"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="hero-eyebrow" variants={fadeUp}>
          RESEARCHER. DESIGNER. PROBLEM SOLVER.
        </motion.div>

        <motion.h1 className="hero-framer-title" variants={fadeUp}>
          <span className="hero-title-row">I Design.</span>
          <span className="hero-title-row">I Build.</span>
          <span className="hero-title-row hero-architect-wrap">
            I Architect.
            <span className="hero-title-underline"></span>
          </span>
        </motion.h1>

        <motion.p className="hero-framer-desc" variants={fadeUp}>
          I like taking an idea from &ldquo;this could be better&rdquo; to something people can actually use. My focus sits at the intersection of design, code and real world interaction.
        </motion.p>

        <motion.div className="hero-buttons" variants={fadeUp}>
          <a href="#projects" className="primary-btn">
            VIEW MY WORK
          </a>

          <a
            href="/Resume_Dishita.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn"
          >
            RESUME →
          </a>
        </motion.div>
      </motion.div>

      {/* RIGHT CANVAS SKETCHBOOK CARD */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, rotate: -2, y: 35 }}
        animate={{ opacity: 1, rotate: 2, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      >
        <div className="sketchbook-canvas">
          {/* Top-Left Colored Semi-Transparent Washi Tape */}
          <div className="canvas-washi-tape"></div>

          {/* Bottom Right Hand-drawn Star */}
          <div className="canvas-star-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>

          {/* DYNAMIC CHANGING TITLE */}
          <div className="canvas-title-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={titles[currentIndex]}
                className="canvas-animated-title-wrap"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <h2 className="canvas-dynamic-heading">
                  {titles[currentIndex]}
                </h2>
                <div className="canvas-brush-underline"></div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="canvas-subtext">
            building things people use :)
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;