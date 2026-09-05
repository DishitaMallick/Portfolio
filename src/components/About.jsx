// src/components/About.jsx

import "../styles/about.css";
import { motion } from "framer-motion";

const capabilities = [
  {
    num: "01",
    title: "SOFTWARE ENGINEERING",
    desc: "Building performant web applications, clean APIs and scalable software solutions.",
    icon: "ri-terminal-box-fill",
  },
  {
    num: "02",
    title: "FRONTEND ARCHITECTURE",
    desc: "Building responsive, modern and interactive component-driven user interfaces.",
    icon: "ri-code-s-slash-fill",
  },
  {
    num: "03",
    title: "UI/UX DESIGN",
    desc: "Designing intuitive user flows, product interfaces and cohesive design systems.",
    icon: "ri-layout-3-fill",
  },
  {
    num: "04",
    title: "CREATIVE TECHNOLOGY",
    desc: "Exploring visual design, interactive motion and experimental web experiences.",
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
          Currently pursuing B.Tech at VIT Chennai, I’m passionate about Software Engineering (SDE), Frontend Architecture and UI/UX Design. I enjoy turning complex algorithms, technical problems and user needs into clean, intuitive and visually engaging digital experiences.
        </p>
        <br />
        <p>
          From web dashboards to enterprise design systems and creative UI experiments, I’m driven by continuous learning, problem-solving and a commitment to building products that are both functional and delightful. Outside code, my background in music, guitar, painting and culinary art enriches my creative problem-solving and user-centric approach.
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