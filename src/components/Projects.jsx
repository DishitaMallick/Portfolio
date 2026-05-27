// src/components/Projects.jsx

import "../styles/projects.css";
import { motion } from "framer-motion";

const projects = [
  {
    title: "PawCare",

    desc: "A heartfelt digital experience designed to make pet care feel more compassionate, supportive and emotionally connected.",

    image: "/p.jpg",

    button: "View Full UX Case Study",

    link: "https://www.behance.net/gallery/249819973/Pawcare-UX-CASE-STUDY",
  },

  {
    title: "UBER Redesign",

    desc: "Creating a safer and more transparent ride-booking experience through proactive safety alerts and fair payment flows.",

    image: "/u.jpg",

    button: "View Full Medium Blog",

    link: "https://medium.com/@dishita.mallick/designing-safer-rides-rethinking-trust-protection-in-ride-hailing-apps-3e9273ef8858",
  },

  {
    title: "Richa Skateboard - E-commerce Platform",

    desc: "Creating a responsive and visually engaging skateboard shopping experience tailored for modern users.",

    image: "/richaa.png",

    button: "View Project on Behance",

    link: "https://www.behance.net/gallery/250042755/RICHA-Skateboard-E-Commerce-UIUX",
  },
];

const Projects = () => {
  return (

    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >

      <div className="tag">
        Featured Work
      </div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Projects crafted with
        <span className="gradient-text">
          {" "}emotion & expression
        </span>
      </motion.h2>

      {/* TOP BAR */}

      <div className="projects-top">

        <div className="scroll-indicator">

          <span></span>

          <p>scroll to explore</p>

        </div>

      </div>

      {/* HORIZONTAL PROJECTS */}

      <div className="horizontal-scroll">

        {projects.map((project, index) => (

          <motion.div
            className="project-card"
            key={index}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.12
            }}
            viewport={{ once: true }}
          >

            <img
              src={project.image}
              alt=""
              className="project-cover"
            />

            <div className="overlay">

              <h3>{project.title}</h3>

              <p>{project.desc}</p>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="case-btn"
              >

                {project.button}

                <span className="arrow">
                  ↗
                </span>

              </a>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
};

export default Projects;