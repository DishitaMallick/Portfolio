// src/components/Navbar.jsx

import { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "WORK", href: "#projects" },
    { name: "SKILLS", href: "#skills" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className="navbar glass">
      <a href="#" className="logo">
        <span className="logo-text gradient-text">Dishita</span>
        <span className="logo-heart">♡</span>
      </a>

      <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="nav-right">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-btn"
        >
          RESUME ↗
        </a>

        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={mobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;