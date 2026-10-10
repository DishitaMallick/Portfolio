// src/components/About.jsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAbout, subscribeToCMS } from "../cms/cmsStore";
import "../styles/about.css";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const About = () => {
  const [aboutData, setAboutData] = useState(() => getAbout());

  useEffect(() => {
    const unsubscribe = subscribeToCMS((event) => {
      if (event.type === "about") {
        setAboutData(event.data);
      }
    });
    return unsubscribe;
  }, []);

  const capabilities = aboutData.capabilities || [];

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div className="tag" variants={fadeUp}>About Me :)</motion.div>

      <motion.h2 className="section-title" variants={fadeUp}>
        {aboutData.title || "Driven by curiosity,"} <br />
        <span className="accent-text">{aboutData.titleAccent || "engineered with precision."}</span>
      </motion.h2>

      <motion.div className="section-subtitle" variants={fadeUp}>
        {aboutData.bio1 && <p>{aboutData.bio1}</p>}
        {aboutData.bio2 && <p>{aboutData.bio2}</p>}
      </motion.div>

      <motion.div
        className="about-capabilities-grid"
        variants={sectionVariants}
      >
        {capabilities.map((item, idx) => (
          <motion.div
            key={idx}
            className="about-cap-card glass"
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="about-cap-top">
              <span className="about-cap-num">{item.num || `0${idx + 1}`}</span>
              <div className="about-cap-icon">
                <i className={item.icon || "ri-code-box-line"}></i>
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