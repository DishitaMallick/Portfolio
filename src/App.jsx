// src/App.jsx

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import FrontendSkills from "./components/FrontendSkills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import AdminPage from "./admin/AdminPage";

import "./index.css";

const MainPortfolio = () => (
  <div className="site-wrapper">
    <CustomCursor />
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <FrontendSkills />
    <Experience />
    <Contact />
  </div>
);

function App() {
  return (
    <Routes>
      {/* PRIVATE ADMIN CMS ROUTE */}
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/admin" element={<AdminPage />} />

      {/* PUBLIC RECRUITER-FACING PORTFOLIO */}
      <Route path="*" element={<MainPortfolio />} />
    </Routes>
  );
}

export default App;