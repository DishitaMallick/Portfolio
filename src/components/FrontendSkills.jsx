// src/components/FrontendSkills.jsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSkills, subscribeToCMS } from "../cms/cmsStore";
import "../styles/skills.css";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const pillVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

const FrontendSkills = () => {
  const [skillCategories, setSkillCategories] = useState(() => getSkills());

  useEffect(() => {
    const unsubscribe = subscribeToCMS((event) => {
      if (event.type === "skills") {
        setSkillCategories(event.data);
      }
    });
    return unsubscribe;
  }, []);

  const publishedCategories = skillCategories.filter((c) => c.published !== false);

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div className="tag" variants={fadeUp}>Technical Stack</motion.div>

      <motion.h2 className="section-title" variants={fadeUp}>
        Tools & Technologies <br />
        <span className="accent-text">in my daily toolkit.</span>
      </motion.h2>

      <motion.p className="section-subtitle" variants={fadeUp}>
        A pragmatic foundation spanning software development, frontend engineering and user experience design.
      </motion.p>

      <motion.div className="skills-grid" variants={sectionVariants}>
        {publishedCategories.map((cat, idx) => (
          <motion.div
            key={cat.id || idx}
            className="skill-card glass"
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="skill-card-header">
              <div className="skill-icon">
                <i className={cat.icon || "ri-code-s-slash-line"}></i>
              </div>
              <h3>{cat.title}</h3>
            </div>

            <motion.div
              className="skill-items"
              variants={sectionVariants}
            >
              {cat.skills &&
                cat.skills.map((skill, sIdx) => (
                  <motion.div key={sIdx} className="skill-item-pill" variants={pillVariant}>
                    <span className="dot"></span>
                    {skill}
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FrontendSkills;
