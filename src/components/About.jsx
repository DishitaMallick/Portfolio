// src/components/About.jsx

import "../styles/about.css";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="tag">About Me</motion.div>

      <motion.h2 variants={itemVariants} className="section-title">
        Driven by curiosity,
        <br />
        <span className="gradient-text">shaped with intention.</span>
      </motion.h2>

      <motion.p variants={itemVariants} className="section-subtitle">
        Currently pursuing B.Tech in Artificial Intelligence and Robotics at VIT Chennai, I’m someone who loves exploring where technology meets creativity. For me, learning has always been about building, experimenting and turning ideas into meaningful designs.
        <br /><br />
        From innovative projects like a Working River Cleaning Boat to handcrafted creative works, every experience has shaped my problem-solving and design thinking. Inspired by music, painting, guitar and culinary art, I believe creativity exists in every form.
      </motion.p>

      <motion.div 
        className="about-grid"
        variants={containerVariants}
      >
        <motion.div 
          className="about-card glass"
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <div className="about-icon">
            <i className="ri-user-heart-line"></i>
          </div>
          <h3>Empathy First</h3>
          <p>
            Every design decision begins with understanding people deeply, focusing on their real-world needs.
          </p>
        </motion.div>

        <motion.div 
          className="about-card glass"
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <div className="about-icon">
            <i className="ri-palette-line"></i>
          </div>
          <h3>Visual Storytelling</h3>
          <p>
            Creating premium user interfaces that emotionally connect with users and tell a brand story.
          </p>
        </motion.div>

        <motion.div 
          className="about-card glass"
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <div className="about-icon">
            <i className="ri-compass-3-line"></i>
          </div>
          <h3>Meaningful Simplicity</h3>
          <p>
            Crafting elegant, decluttered, and clean digital experiences without unnecessary complexity.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;