// src/components/Hero.jsx

import { motion } from "framer-motion";
import "../styles/hero.css";

const Hero = ({ mode }) => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* LEFT */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: "easeOut"
        }}
      >
        <div className="tag">
          {mode === "designer"
            ? "UI/UX Designer • Frontend Dev • Visual Design"
            : "🌱 Creator • Explorer • Storyteller"}
        </div>

        <h1>
          Hi, I'm
          <span className="gradient-text">
            {" "}DISHITA
          </span>
        </h1>

        <p>
          {mode === "designer"
            ? "Curious by nature, endlessly exploring and passionate about thoughtful design that turns ideas into meaningful experiences."
            : "Driven by curiosity and a love for storytelling. I explore the world through travel, cooking, music, art, and the messy, beautiful process of creating."}
        </p>

        <div className="hero-buttons">
          <a
            href={mode === "designer" ? "#projects" : "#bento"}
            className="primary-btn"
          >
            {mode === "designer" ? "View Projects" : "Explore My World"}
          </a>

          <a
            href="#contact"
            className="secondary-btn"
          >
            Let's Connect
          </a>
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        className="hero-right"
        initial={{
          opacity: 0,
          rotate: mode === "designer" ? -4 : -8,
          y: 120
        }}
        animate={{
          opacity: 1,
          rotate: mode === "designer" ? -2 : -4,
          y: 0
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
        key={mode}
      >
        <div className="canvas-wrapper">
          <div className={`canvas-board glass ${mode === "human" ? "scrapbook" : "futuristic"}`}>
            <div className="pin pin1"></div>
            <div className="pin pin2"></div>

            <div className="scribble scribble1"></div>
            <div className="scribble scribble2"></div>

            {mode === "designer" ? (
              <>
                <motion.h2
                  className="canvas-text ux"
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  ux.
                </motion.h2>

                <motion.h2
                  className="canvas-text code"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  code.
                </motion.h2>

                <motion.h2
                  className="canvas-text aesthetic"
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                >
                  aesthetics.
                </motion.h2>
              </>
            ) : (
              <>
                <motion.h2
                  className="canvas-text travel"
                  initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -5, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  travel.
                </motion.h2>

                <motion.h2
                  className="canvas-text food"
                  initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 6, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  food.
                </motion.h2>

                <motion.h2
                  className="canvas-text stories"
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                >
                  stories.
                </motion.h2>
              </>
            )}

            <div className="curve"></div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;