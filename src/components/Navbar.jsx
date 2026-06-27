// src/components/Navbar.jsx

import { motion } from "framer-motion";
import "../styles/navbar.css";

const Navbar = ({ mode, setMode }) => {
  return (
    <nav className="navbar glass">
      <div className="logo gradient-text">
        Dishita ♡
      </div>

      <div className="mode-toggle-container">
        <div className="mode-toggle">
          <button
            className={`toggle-btn ${mode === "designer" ? "active" : ""}`}
            onClick={() => setMode("designer")}
          >
            {mode === "designer" && (
              <motion.span
                layoutId="active-pill"
                className="active-pill designer-pill"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="btn-text">👩‍💻 Designer Mode</span>
          </button>

          <button
            className={`toggle-btn ${mode === "human" ? "active" : ""}`}
            onClick={() => setMode("human")}
          >
            {mode === "human" && (
              <motion.span
                layoutId="active-pill"
                className="active-pill human-pill"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="btn-text">🌱 Human Mode</span>
          </button>
        </div>
      </div>

      <div className="nav-right">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn"
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;