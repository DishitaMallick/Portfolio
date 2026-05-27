import "../styles/contact.css";
import { motion } from "framer-motion";
const Contact = () => {

  const glowIcons = () => {

    const footer =
      document.querySelector(".footer");

    footer.classList.add("footer-active");

    setTimeout(() => {
      footer.classList.remove("footer-active");
    }, 2200);

    document
      .querySelector("#socials")
      .scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>

      <motion.section
  id="contact"
  initial={{ opacity: 0, y: 120 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>

        <div className="contact-box glass">

          <div className="tag">
            Contact
          </div>

          <h2>
            Let’s create
            <span className="gradient-text">
              {" "}something meaningful
            </span>
            {" "}together.
          </h2>

          <p>
            Whether it’s a collaboration, freelance project or simply a friendly
            conversation about design — I’d love to connect.
          </p>

          <button
            className="contact-btn"
            onClick={glowIcons}
          >
            Say Hello
          </button>

        </div>

      </motion.section>

      {/* FOOTER */}

      <footer
        className="footer"
        id="socials"
      >

        <a
          href="https://www.linkedin.com/in/dishita-mallick-72a712321"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <i className="ri-linkedin-fill"></i>
        </a>

        <a
          href="https://www.behance.net/dsdiary"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <i className="ri-behance-fill"></i>
        </a>

        <a
          href="mailto:dishita.mallick@gmail.com"
          className="social-icon"
        >
          <i className="ri-mail-fill"></i>
        </a>

      </footer>

    </>
  );
};

export default Contact;