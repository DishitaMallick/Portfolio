// src/components/Experience.jsx

import "../styles/experience.css";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "UI/UX, Digital Marketing Summer Intern",
    company: "IIT Jammu",
    duration: "June 2026- Present",
    desc: "Learned core UI/UX concepts and design thinking while gaining practical insights from experienced industry professionals.",
    skills: ["Design Principles", "Colour Theory", "Typography", "Wireframing", "Prototyping"]
  },
  {
    role: "Editorial Lead",
    company: "Animation Club, VITC",
    duration: "April 2026 - Present",
    desc: "Directed editorial and creative content for club activities, producing engaging videos, promotional materials and social media campaigns while collaborating with cross-functional teams.",
    skills: ["Leadership", "Communication", "Content Creation", "Video Editing", "Social Media Management", "Team Collaboration"]
  },
  {
    role: "Campus Ambassador",
    company: "E-cell MANIT Bhopal (NITB)",
    duration: "January 2026 - February 2026",
    desc: "Served as a Campus Ambassador for E-Summit, driving event awareness, student participation and community engagement through strategic outreach and promotion.",
    skills: ["Leadership", "Communication", "Event Management", "Marketing", "Networking", "Community Building"]
  }
];

const Experience = () => {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="tag">Journey</div>

      <h2 className="section-title">
        Professional
        <br />
        <span className="gradient-text">Experience & Roles</span>
      </h2>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <motion.div
            className="timeline-item glass"
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="timeline-meta">
              <span className="timeline-duration">{exp.duration}</span>
              <h4 className="timeline-company">{exp.company}</h4>
            </div>

            <div className="timeline-content">
              <h3>{exp.role}</h3>
              <p>{exp.desc}</p>
              <div className="timeline-skills">
                {exp.skills.map((skill, sIdx) => (
                  <span className="skill-tag" key={sIdx}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
