// src/components/FrontendSkills.jsx

import { motion } from "framer-motion";
import "../styles/skills.css";

const skillCategories = [
  {
    title: "FRONTEND",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    icon: "ri-code-s-slash-line",
  },
  {
    title: "TOOLS",
    skills: ["Git", "GitHub", "Firebase", "Vercel"],
    icon: "ri-tools-line",
  },
  {
    title: "DESIGN",
    skills: ["Figma", "FigJam", "Canva", "Adobe Creative Suite"],
    icon: "ri-palette-line",
  },
  {
    title: "ROBOTICS",
    skills: ["ROS", "Sensors", "TinkerCAD", "Hardware"],
    icon: "ri-cpu-line",
  },
];

const FrontendSkills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="tag">
        Technical Skills
      </motion.div>

      <motion.h2 variants={itemVariants} className="section-title">
        I LIKE MAKING <br />
        <span className="gradient-text">INTERFACES WORK.</span>
      </motion.h2>

      <motion.p variants={itemVariants} className="section-subtitle">
        I enjoy turning ideas and designs into responsive, interactive digital experiences — from polished landing pages to dashboards and web applications.
      </motion.p>

      <motion.div className="skills-grid" variants={containerVariants}>
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            className="skill-card glass"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="skill-card-header">
              <div className="skill-icon">
                <i className={cat.icon}></i>
              </div>
              <h3>{cat.title}</h3>
            </div>

            <div className="skill-items">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-item-pill">
                  <span className="dot"></span>
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FrontendSkills;
