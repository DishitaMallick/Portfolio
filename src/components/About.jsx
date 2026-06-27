// src/components/About.jsx

import "../styles/about.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="tag">About Me</div>

      <h2 className="section-title">
        Driven by curiosity,
        <br />
        <span className="gradient-text">shaped with intention.</span>
      </h2>

      <p className="section-subtitle">
        Currently pursuing B.Tech in Artificial Intelligence and Robotics at VIT Chennai, I’m someone who loves exploring where technology meets creativity. For me, learning has always been about building, experimenting and turning ideas into meaningful designs.
        <br /><br />
        From innovative projects like a Working River Cleaning Boat to handcrafted creative works, every experience has shaped my problem-solving and design thinking. Inspired by music, painting, guitar and culinary art, I believe creativity exists in every form.
      </p>

      <div className="about-grid">
        <div className="about-card glass">
          <div className="about-icon">
            <i className="ri-user-heart-line"></i>
          </div>
          <h3>Empathy First</h3>
          <p>
            Every design decision begins with understanding people deeply, focusing on their real-world needs.
          </p>
        </div>

        <div className="about-card glass">
          <div className="about-icon">
            <i className="ri-palette-line"></i>
          </div>
          <h3>Visual Storytelling</h3>
          <p>
            Creating premium user interfaces that emotionally connect with users and tell a brand story.
          </p>
        </div>

        <div className="about-card glass">
          <div className="about-icon">
            <i className="ri-compass-3-line"></i>
          </div>
          <h3>Meaningful Simplicity</h3>
          <p>
            Crafting elegant, decluttered, and clean digital experiences without unnecessary complexity.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default About;