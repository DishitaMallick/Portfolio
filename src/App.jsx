// src/App.jsx

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import DesignProcess from "./components/DesignProcess";
import Contact from "./components/Contact";

function App() {
  return (
    <>
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