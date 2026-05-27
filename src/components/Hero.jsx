// src/components/Hero.jsx

import hero from "../assets/hero.png";
// Hero.jsx
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">

        <div className="tag">
          UI/UX Designer • Frontend Dev • Visual Design 
        </div>

        <h1>
          Hi, I'm
          <span className="gradient-text"> DISHITA</span>
          
        </h1>

        <p>
          Curious Soul | Endless Exploring | Thoughtful Design
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="primary-btn">
            View Projects
          </a>

          <a href="#contact" className="secondary-btn">
            Let's Connect
          </a>
        </div>
      </div>

      <div className="hero-right">

  <div className="hero-right">

  <div className="canvas-wrapper">

    <div className="canvas-board glass">

      <div className="pin pin1"></div>
      <div className="pin pin2"></div>

      <div className="scribble scribble1"></div>
      <div className="scribble scribble2"></div>

      <h2 className="canvas-text ux">
        ux.
      </h2>

      <h2 className="canvas-text code">
        code.
      </h2>

      <h2 className="canvas-text aesthetic">
        aesthetics.
      </h2>

      <div className="curve"></div>

    </div>

  </div>

</div>

</div>
    </section>
  );
};

export default Hero;