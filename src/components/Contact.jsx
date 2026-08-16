// src/components/Contact.jsx

import "../styles/contact.css";
import { motion } from "framer-motion";

const Contact = () => {
  const glowIcons = () => {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    footer.classList.add("footer-active");

    setTimeout(() => {
      footer.classList.remove("footer-active");
    }, 2200);

    document.querySelector("#socials")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="contact-box glass">
          <div className="tag">Contact</div>

          <h2>
            LET'S BUILD <br />
            <span className="gradient-text">SOMETHING.</span>
          </h2>

          <p>
            Have an interesting idea, project, or opportunity? Let's talk.
          </p>

          <div className="contact-actions">
            <a
              href="mailto:dishita.mallick@gmail.com"
              className="contact-primary-link"
            >
              EMAIL ME
            </a>
            <button className="contact-btn" onClick={glowIcons}>
              CONNECT ON SOCIALS
            </button>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer" id="socials">
        <a
          href="mailto:dishita.mallick@gmail.com"
          className="social-icon"
          title="Email"
        >
          <i className="ri-mail-fill"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/dishita-mallick-72a712321"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="LinkedIn"
        >
          <i className="ri-linkedin-fill"></i>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="GitHub"
        >
          <i className="ri-github-fill"></i>
        </a>

        <a
          href="https://www.behance.net/dsdiary"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          title="Behance"
        >
          <i className="ri-behance-fill"></i>
        </a>
      </footer>
    </>
  );
};

export default Contact;