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
          SOFTWARE ENGINEERING • FRONTEND • UI/UX
        </div>

        <h1>
          <span className="hero-line">I DESIGN.</span>
          <span className="hero-line gradient-text">I BUILD.</span>
          <span className="hero-line gradient-text">I ARCHITECT.</span>
        </h1>

        <p>
          Computer Science & Software Development Engineer crafting scalable web applications, modern frontends and intuitive digital products.
        </p>

        <div className="hero-buttons">
          <a
            href="#projects"
            className="primary-btn"
          >
            EXPLORE MY WORK
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn"
          >
            RESUME
          </a>
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        className="hero-right"
        initial={{
          opacity: 0,
          rotate: -3,
          y: 80
        }}
        animate={{
          opacity: 1,
          rotate: -2,
          y: 0
        }}
        transition={{
          duration: 1,
          ease: "easeOut"
        }}
      >
        <div className="canvas-wrapper">
          <div className="canvas-board glass futuristic">
            <div className="pin pin1"></div>
            <div className="pin pin2"></div>

            <div className="scribble scribble1"></div>
            <div className="scribble scribble2"></div>

            <motion.h2
              className="canvas-text ux"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              frontend.
            </motion.h2>

            <motion.h2
              className="canvas-text code"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              ui/ux.
            </motion.h2>

            <motion.h2
              className="canvas-text aesthetic"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              sde.
            </motion.h2>

            <div className="curve"></div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;