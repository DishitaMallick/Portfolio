// src/components/Navbar.jsx
import "../styles/navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar glass">

      <div className="logo gradient-text">
        Dishita ♡
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn"
      >
        Resume
      </a>

    </nav>
  );
};

export default Navbar;