// src/components/About.jsx

import "../styles/about.css";
import { motion } from "framer-motion";

const capabilities = [
  {
    num: "01",
    title: "FRONTEND",
    desc: "Building responsive and interactive web experiences.",
    icon: "ri-code-s-slash-fill",
  },
  {
    num: "02",
    title: "UI/UX",
    desc: "Designing intuitive interfaces and product experiences.",
    icon: "ri-layout-3-fill",
  },
  {
    num: "03",
    title: "ROBOTICS",
    desc: "Working with robotic systems, interfaces and physical technology.",
    icon: "ri-robot-2-fill",
  },
  {
    num: "04",
    title: "CREATIVE TECHNOLOGY",
    desc: "Exploring visual design, motion and experimental digital experiences.",
    icon: "ri-sparkling-2-fill",
  },
];

const About = () => {
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
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="tag">
        About Me
      </motion.div>

      <motion.h2 variants={itemVariants} className="section-title">
        Driven by curiosity, <br />
        <span className="gradient-text">shaped with intention.</span>
      </motion.h2>

      <motion.div variants={itemVariants} className="section-subtitle">
        <p>
          Currently pursuing a B.Tech in Artificial Intelligence and Robotics at VIT Chennai, I’m passionate about exploring the intersection of robotics, frontend development and UI/UX design. I enjoy turning technical ideas into intuitive, visually engaging experiences - whether it’s designing interfaces, building responsive frontends or working with robotic systems.


        </p>
        <br />
        <p>
          From projects like a Working River Cleaning Boat to creative design and hands-on experiments, I’m driven by curiosity, problem-solving and the desire to build things that are both functional and meaningful. Outside technology, my interests in music, guitar, painting and culinary art continue to shape the way I think creatively and approach design.
        </p>
      </motion.div>

      {/* MERGED CAPABILITIES BOXES */}
      <motion.div className="about-capabilities-grid" variants={containerVariants}>
        {capabilities.map((item, idx) => (
          <motion.div
            key={idx}
            className="about-cap-card glass"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="about-cap-top">
              <span className="about-cap-num">{item.num}</span>
              <div className="about-cap-icon">
                <i className={item.icon}></i>
              </div>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default About;