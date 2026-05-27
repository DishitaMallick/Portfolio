// src/components/About.jsx
// About.jsx
import "../styles/about.css";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.section
  id="about"
  initial={{ opacity: 0, y: 120 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>

      <div className="tag">
        About Me
      </div>

      <h2 className="section-title">
  Driven by curiosity,
  <br />

  <span className="gradient-text">
    shaped with intention.
  </span>
</h2>

      <p className="section-subtitle">
        Currently pursuing B.Tech in Artificial Intelligence and Robotics at VIT Chennai, I’m someone who loves exploring where technology meets creativity. For me, learning has always been about building, experimenting and turning ideas into meaningful designs. My journey, which began at Delhi Public School, Joka, taught me to stay curious, think differently and create with purpose.
        <br></br><br></br>
        From innovative projects like a Working River Cleaning Boat to handcrafted creative works, every experience has shaped my problem-solving and design thinking. Inspired by music, painting, guitar and culinary art, I believe creativity exists in every form. I’m Dishita—always learning, always creating and always open to meaningful ideas and collaborations.
      </p>

      <div className="about-grid">

        <div className="about-card glass">
          <h3>Empathy First</h3>
          <p>
            Every design decision begins with understanding people deeply.
          </p>
        </div>

        <div className="about-card glass">
          <h3>Visual Storytelling</h3>
          <p>
            Creating interfaces that emotionally connect with users.
          </p>
        </div>

        <div className="about-card glass">
          <h3>Meaningful Simplicity</h3>
          <p>
            Clean, elegant experiences without unnecessary complexity.
          </p>
        </div>

      </div>
    </motion.section>
  );
};

export default About;