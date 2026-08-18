// src/components/Projects.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/projects.css";

const projectsData = [
  {
    id: "pawcare",
    title: "PawCare",
    desc: "A compassionate digital experience for pet care and emotional well-being.",
    image: "/p.jpg",
    isVideo: false,
    categories: ["FRONTEND", "UI/UX"],
    categoryLabel: "FRONTEND • UI/UX",
    techStack: ["React", "JavaScript", "HTML", "CSS", "Figma"],
    link: "https://www.behance.net/gallery/249819973/Pawcare-UX-CASE-STUDY",
    buttonText: "VIEW PROJECT",
  },
  {
    id: "richa-skateboard",
    title: "Richa Skateboard",
    desc: "Responsive skateboard e-commerce shopping experience for modern users.",
    image: "/richaa.png",
    isVideo: false,
    categories: ["FRONTEND", "UI/UX"],
    categoryLabel: "FRONTEND • UI/UX",
    techStack: ["HTML", "CSS", "JavaScript", "Figma"],
    link: "https://www.behance.net/gallery/250042755/RICHA-Skateboard-E-Commerce-UIUX",
    buttonText: "VIEW PROJECT",
  },
  {
    id: "uber-redesign",
    title: "UBER Redesign",
    desc: "Safer ride-booking experience with proactive safety alerts and fair payments.",
    image: "/u.png",
    isVideo: false,
    categories: ["UI/UX"],
    categoryLabel: "UI/UX • PRODUCT DESIGN",
    techStack: ["Figma", "UI/UX", "User Research"],
    link: "https://medium.com/@dishita.mallick/designing-safer-rides-rethinking-trust-protection-in-ride-hailing-apps-3e9273ef8858",
    buttonText: "VIEW BLOG",
  },
  {
    id: "smart-classroom-seat",
    title: "Smart Classroom Seat",
    desc: "Multi-sensor IoT seat monitoring student posture, health and engagement in real-time.",
    image: "seatt.jpg",
    isVideo: false,
    categories: ["ROBOTICS", "CREATIVE"],
    categoryLabel: "ROBOTICS • SENSOR FUSION",
    techStack: ["Arduino", "ESP32-CAM", "FSR", "MPU6050", "MAX30100", "DS18B20"],
    link: "/smart-classroom-seat",
    buttonText: "VIEW PROJECT",
  },
  {
    id: "obstacle-car",
    title: "Obstacle Detection Car",
    desc: "Autonomous robot car with ultrasonic, IR sensor, buzzer and LED alerts.",
    media: "/od.mov",
    isVideo: true,
    categories: ["ROBOTICS", "CREATIVE"],
    categoryLabel: "ROBOTICS • ASSEMBLY LANGUAGE",
    techStack: ["8051", "Assembly Language", "Ultrasonic Sensor", "IR Sensor"],
    link: "/obstacle-detection-car",
    buttonText: "VIEW PROJECT",
  },
];

const categories = ["ALL", "FRONTEND", "UI/UX", "ROBOTICS", "CREATIVE"];

const Projects = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = activeFilter === "ALL"
    ? projectsData
    : projectsData.filter((p) => p.categories.includes(activeFilter));

  // Ensure enough items for smooth infinite horizontal loop
  const displayProjects = filteredProjects.length < 4
    ? [...filteredProjects, ...filteredProjects, ...filteredProjects]
    : [...filteredProjects, ...filteredProjects];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="tag">Portfolio</div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        THINGS <span className="gradient-text">I'VE BUILT</span>
      </motion.h2>

      <p className="section-subtitle">
        Explore interactive web applications, design systems, robotics builds and software experiments.
      </p>

      {/* FILTER BAR */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {activeFilter === cat && (
              <motion.span
                layoutId="activeFilterPill"
                className="filter-active-pill"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="filter-text">{cat}</span>
          </button>
        ))}
      </div>

      {/* HORIZONTAL CAROUSEL */}
      <div className="carousel-container">
        <div className="scroll-indicator">
          <span></span>
          <p>hover to pause • drag or scroll horizontally</p>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-track">
            {displayProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                className="project-card glass"
                style={{ cursor: project.link ? "pointer" : "default" }}
                onClick={() => {
                  if (project.link) {
                    if (project.link.startsWith("/")) {
                      navigate(project.link);
                    } else {
                      window.open(project.link, "_blank", "noopener,noreferrer");
                    }
                  }
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
              >
                {/* MEDIA PREVIEW */}
                <div className="project-media-wrapper">
                  {project.isVideo ? (
                    <video
                      src={project.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="project-cover"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/q.jpg";
                      }}
                    />
                  )}
                </div>

                {/* INFO CONTENT */}
                <div className="project-info">
                  {/* TOPIC NAME & CATEGORY OVAL TAG */}
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="project-cat-badge">{project.categoryLabel}</span>
                  </div>

                  <p className="project-desc">{project.desc}</p>

                  {/* TECH STACK TAGS */}
                  <div className="tech-tags">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* ACTION LINK */}
                  {project.link ? (
                    project.link.startsWith("/") ? (
                      <Link to={project.link} className="case-btn" onClick={(e) => e.stopPropagation()}>
                        {project.buttonText}
                      </Link>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="case-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.buttonText}
                      </a>
                    )
                  ) : (
                    <span className="case-btn static-badge">
                      {project.buttonText}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;