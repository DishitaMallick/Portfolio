// src/components/Experience.jsx

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getExperiences, subscribeToCMS } from "../cms/cmsStore";
import "../styles/experience.css";

const Experience = () => {
  const [experiences, setExperiences] = useState(() => getExperiences());

  useEffect(() => {
    const unsubscribe = subscribeToCMS((event) => {
      if (event.type === "experiences") {
        setExperiences(event.data);
      }
    });
    return unsubscribe;
  }, []);

  const publishedExperiences = experiences.filter((e) => e.published !== false);

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="tag">Experience &amp; Roles</div>

      <h2 className="section-title">
        Professional Journey &amp; <span className="accent-text">Leadership</span>
      </h2>

      <div className="experience-timeline">
        {publishedExperiences.map((exp, index) => (
          <ExperienceItem key={exp.id || index} exp={exp} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

/* Each item slides in from alternating sides */
const ExperienceItem = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="timeline-item glass"
      initial={{ opacity: 0, x: fromLeft ? -120 : 120, scale: 0.92 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: fromLeft ? -120 : 120, scale: 0.92 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="timeline-slide-indicator" data-direction={fromLeft ? "left" : "right"} />

      <div className="timeline-meta">
        <span className="timeline-duration">{exp.duration}</span>
        <h4 className="timeline-company">{exp.company}</h4>
      </div>

      <div className="timeline-content">
        <h3>{exp.role}</h3>
        <p>{exp.desc}</p>
        {exp.skills && exp.skills.length > 0 && (
          <div className="timeline-skills">
            {exp.skills.map((skill, sIdx) => (
              <motion.span
                className="skill-tag"
                key={sIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.3 + sIdx * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Experience;
