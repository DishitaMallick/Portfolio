// src/components/Projects.jsx

import "../styles/projects.css";

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
    <section id="projects">

      <div className="tag">
        Featured Work
      </div>

      <h2 className="section-title">
        Projects crafted with
        <span className="gradient-text">
          {" "}emotion & expression
        </span>
      </h2>

      <div className="project-grid">

        {projects.map((project, index) => (

          <div className="project-card glass" key={index}>

            <div className="project-image">

              <img
                src={project.image}
                alt=""
              />

            </div>

            <div className="project-content">

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

          </div>

        ))}

      </div>

    </section>
  );
};

export default Projects;