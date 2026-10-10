// src/components/Contact.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/contact.css";

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Contact = () => {
  const [isGlowing, setIsGlowing] = useState(false);

  return (
    <>
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div className="contact-box glass" variants={fadeUp}>
          <motion.div className="tag" variants={fadeUp}>Get in Touch</motion.div>

          <motion.h2 variants={fadeUp}>
            Let's build something <br />
            <span className="accent-text">meaningful together.</span>
          </motion.h2>

          <motion.p variants={fadeUp}>
            Whether you have an interesting software engineering challenge, a design collaboration or a full-time opportunity, my inbox is always open.
          </motion.p>

          <motion.div className="contact-actions" variants={fadeUp}>
            <button
              type="button"
              id="say-hello-btn"
              className={`primary-btn say-hello-btn ${isGlowing ? "active" : ""}`}
              onClick={() => {
                if (isGlowing) return;
                setIsGlowing(true);
                document.querySelector("#socials")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
                setTimeout(() => setIsGlowing(false), 2500);
              }}
              aria-pressed={isGlowing}
              title="Click to illuminate social links!"
            >
              <span>say HELLO, maybe?</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* RECRUITER FOOTER */}
      <motion.footer
        className="footer"
        id="socials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div
          className={`footer-social-links ${isGlowing ? "glowing" : ""}`}
          variants={sectionVariants}
        >
          <motion.a
            href="mailto:dishita.mallick@gmail.com"
            className="social-icon"
            title="Email"
            aria-label="Email Dishita"
            variants={scaleIn}
            whileHover={{ y: -4, scale: 1.1 }}
          >
            <i className="ri-mail-line"></i>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/dishita-mallick-72a712321"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
            variants={scaleIn}
            whileHover={{ y: -4, scale: 1.1 }}
          >
            <i className="ri-linkedin-line"></i>
          </motion.a>

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="GitHub"
            aria-label="GitHub Profile"
            variants={scaleIn}
            whileHover={{ y: -4, scale: 1.1 }}
          >
            <i className="ri-github-line"></i>
          </motion.a>

          <motion.a
            href="https://www.behance.net/dsdiary"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title="Behance"
            aria-label="Behance Profile"
            variants={scaleIn}
            whileHover={{ y: -4, scale: 1.1 }}
          >
            <i className="ri-behance-line"></i>
          </motion.a>
        </motion.div>

        <motion.div className="footer-bottom-info" variants={fadeUp}>
          <p>© {new Date().getFullYear()} Dishita Mallick • Designed & Engineered with Care</p>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default Contact;