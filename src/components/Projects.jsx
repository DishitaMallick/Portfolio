// src/components/Projects.jsx

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjects, subscribeToCMS } from "../cms/cmsStore";
import "../styles/projects.css";

const SCROLL_SPEED = 0.5; // px per frame

const Projects = () => {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState(() => getProjects());
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);
  const animFrameRef = useRef(null);
  const scrollPosRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);

  useEffect(() => {
    const unsubscribe = subscribeToCMS((event) => {
      if (event.type === "projects") {
        setProjectsList(event.data);
      }
    });
    return unsubscribe;
  }, []);

  const publishedProjects = projectsList.filter((p) => p.published !== false);

  const uniqueCats = Array.from(
    new Set(publishedProjects.flatMap((p) => p.categories || []))
  );
  const categories = ["ALL", ...uniqueCats];

  const filteredProjects =
    activeFilter === "ALL"
      ? publishedProjects
      : publishedProjects.filter((p) => p.categories && p.categories.includes(activeFilter));

  // Triple the items for seamless infinite loop
  const carouselItems = [...filteredProjects, ...filteredProjects, ...filteredProjects];

  // Auto-scroll loop
  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!isPaused && !isDragging.current) {
      scrollPosRef.current += SCROLL_SPEED;

      const singleSetWidth = track.scrollWidth / 3;
      if (scrollPosRef.current >= singleSetWidth) {
        scrollPosRef.current -= singleSetWidth;
      }
      if (scrollPosRef.current < 0) {
        scrollPosRef.current += singleSetWidth;
      }

      track.style.transform = `translateX(-${scrollPosRef.current}px)`;
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [animate]);

  // Reset on filter change
  useEffect(() => {
    scrollPosRef.current = 0;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(0px)`;
    }
  }, [activeFilter]);

  // --- Drag / touch to scroll ---
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    dragScrollStart.current = scrollPosRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = dragStartX.current - x;
    scrollPosRef.current = dragScrollStart.current + delta;

    const track = trackRef.current;
    if (track) {
      const singleSetWidth = track.scrollWidth / 3;
      if (scrollPosRef.current >= singleSetWidth) scrollPosRef.current -= singleSetWidth;
      if (scrollPosRef.current < 0) scrollPosRef.current += singleSetWidth;
      track.style.transform = `translateX(-${scrollPosRef.current}px)`;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Mouse wheel horizontal scroll
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      scrollPosRef.current += e.deltaX;
      const track = trackRef.current;
      if (track) {
        const singleSetWidth = track.scrollWidth / 3;
        if (scrollPosRef.current >= singleSetWidth) scrollPosRef.current -= singleSetWidth;
        if (scrollPosRef.current < 0) scrollPosRef.current += singleSetWidth;
        track.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }
    }
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.div
        className="tag"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        Selected Work
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: false }}
      >
        Featured <span className="accent-text">Projects &amp; Systems</span>
      </motion.h2>

      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false }}
      >
        A selection of digital products, frontend applications and design systems engineered with focus on performance and usability.
      </motion.p>

      {/* FILTER BAR */}
      {categories.length > 1 && (
        <motion.div
          className="filter-bar"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: false }}
        >
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
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="filter-text">{cat}</span>
            </button>
          ))}
        </motion.div>
      )}

      {/* HORIZONTAL CAROUSEL — auto-scrolls, pauses on hover, draggable */}
      <div
        className="projects-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); isDragging.current = false; }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
      >
        <div className="projects-carousel-track" ref={trackRef}>
          {carouselItems.map((project, idx) => (
            <motion.div
              key={`${project.id}-${idx}`}
              className="project-card glass"
              style={{ cursor: project.link ? "pointer" : "default" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (idx % filteredProjects.length) * 0.1 }}
              viewport={{ once: false, amount: 0.1 }}
              onClick={() => {
                if (isDragging.current) return;
                if (project.link) {
                  if (project.link.startsWith("/")) {
                    navigate(project.link);
                  } else {
                    window.open(project.link, "_blank", "noopener,noreferrer");
                  }
                }
              }}
            >
              {/* MEDIA PREVIEW */}
              <div className="project-media-wrapper">
                {project.isVideo ? (
                  <video
                    src={project.media || project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="project-cover"
                  />
                ) : (
                  <img
                    src={project.image || "/p.jpg"}
                    alt={project.title}
                    className="project-cover"
                    draggable={false}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/p.jpg";
                    }}
                  />
                )}
              </div>

              {/* INFO CONTENT */}
              <div className="project-info">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  {project.categoryLabel && (
                    <span className="project-cat-badge">{project.categoryLabel}</span>
                  )}
                </div>

                <p className="project-desc">{project.desc}</p>

                {project.techStack && project.techStack.length > 0 && (
                  <div className="tech-tags">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.link ? (
                  project.link.startsWith("/") ? (
                    <Link
                      to={project.link}
                      className="case-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.buttonText || "VIEW PROJECT"} →
                    </Link>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.buttonText || "VIEW PROJECT"} →
                    </a>
                  )
                ) : (
                  <span className="case-btn static-badge">
                    {project.buttonText || "INTERNAL PROJECT"}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="carousel-fade carousel-fade-left" />
        <div className="carousel-fade carousel-fade-right" />
      </div>
    </motion.section>
  );
};

export default Projects;