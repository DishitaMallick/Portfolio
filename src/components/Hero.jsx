// src/components/Hero.jsx

import { motion } from "framer-motion";
import "../styles/hero.css";

const Hero = () => {
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
          UI/UX Designer • Frontend Dev • Visual Design
        </div>

        <h1>
          Hi, I'm
          <span className="gradient-text">
            {" "}DISHITA
          </span>
        </h1>

        <p>
          Curious Soul | Endless Exploring | Thoughtful Design
        </p>

        <div className="hero-buttons">

          <a
            href="#projects"
            className="primary-btn"
          >
            View Projects
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
          rotate: -12,
          y: 120
        }}
        animate={{
          opacity: 1,
          rotate: -4,
          y: 0
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      >

        <div className="canvas-wrapper">

          <div className="canvas-board glass">

            <div className="pin pin1"></div>
            <div className="pin pin2"></div>

            <div className="scribble scribble1"></div>
            <div className="scribble scribble2"></div>

            <motion.h2
              className="canvas-text ux"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.7
              }}
            >
              ux.
            </motion.h2>

            <motion.h2
              className="canvas-text code"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.7
              }}
            >
              code.
            </motion.h2>

            <motion.h2
              className="canvas-text aesthetic"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.7
              }}
            >
              aesthetics.
            </motion.h2>

            <div className="curve"></div>

          </div>

        </div>

      </motion.div>

    </motion.section>
  );
};

export default Hero;