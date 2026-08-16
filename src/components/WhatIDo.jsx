// src/components/WhatIDo.jsx

import { motion } from "framer-motion";
import "../styles/whatido.css";

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

const WhatIDo = () => {
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
      id="what-i-do"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="tag">
        Capabilities
      </motion.div>

      <motion.h2 variants={itemVariants} className="section-title">
        WHAT <span className="gradient-text">I DO</span>
      </motion.h2>

      <motion.p variants={itemVariants} className="section-subtitle">
        Bridging the gap between engineering and design across multiple technical disciplines.
      </motion.p>

      <motion.div className="what-grid" variants={containerVariants}>
        {capabilities.map((item, idx) => (
          <motion.div
            key={idx}
            className="what-card glass"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="what-card-top">
              <span className="what-num">{item.num}</span>
              <div className="what-icon">
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

export default WhatIDo;
