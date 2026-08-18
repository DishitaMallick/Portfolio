// src/components/HumanBento.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/human.css";

// 📸 Photography gallery data with custom captions
const photographyData = [
  { url: "/tml1.jpeg", caption: "Sun-dappled Greenhouse" },
  { url: "/tml2.jpeg", caption: "Urban Contemplation" },
  { url: "/tml3.jpeg", caption: "Mist-covered Lake" },
  { url: "/tml4.jpeg", caption: "Polaroid Travels" },
  { url: "/tml5.JPG", caption: "Warm Cafes & Cafe Lights" },
  { url: "/tml6.JPG", caption: "Golden Hour Textures" },
  { url: "/tml7.JPG", caption: "Everyday Shadows" }
];

// 🍝 Culinary canvas data
const culinaryData = [
  {
    title: "Homemade Potato Gnocchi",
    image: "/cc2.jpg",
    story: "There's something satisfying about turning a few simple ingredients into something comforting. Today's takeaway: craft over speed."
  },

  {
    title: "Homemade Onion Rings",
    image: "/cc3.png",
    story: "A lesson in patience, precision and the perfect crunch."
  }
];

// 🚀 Curiosity Lab engineering builds
const labData = [
  {
    title: "Working River Cleaning Boat",
    tag: "STEM",
    video: "boat.MP4",
    desc: "Designed and built my first ever working engineering model for Quanta, my school's annual science fest. The project showcased a functional river cleaning boat capable of collecting floating waste using a conveyor-based mechanism.",

    details: "Constructed the prototype using recycled cans for buoyancy, lightweight cloth for the conveyor belt, DC motors, batteries, electrical wiring, switches and a handcrafted frame. The working model demonstrated the concept of collecting floating waste from water bodies.",

    learned: "This project introduced me to hands on prototyping, mechanical assembly, electrical circuits and iterative problem solving. Building my first functional model strengthened my interest in engineering, robotic and designing practical solutions for real world challenges."
  },
  {
    title: "Obstacle Detection Car",
    tag: "MPMC/Sensors",
    video: "od.mov",
    desc: "Designed and built an obstacle detection and line following robot as part of the MPMC course project. The robot autonomously followed a predefined path while detecting and avoiding obstacles using sensor based navigation.",

    details: "Developed the prototype using an 8051 microcontroller, IR sensors, obstacle detection sensors, DC motors, batteries, electrical wiring. Integrated the hardware components to achieve reliable autonomous movement and real time obstacle detection.",

    learned: "Gained hands on experience with 8051 microcontroller programming, embedded systems, sensor interfacing, motor control, circuit assembly and troubleshooting. The project strengthened my understanding of autonomous robotic systems and hardware integration."
  }

];

// 🎨 Handmade art pieces
const artData = [
  { url: "rabbit.jpg", title: "Whiskers & Wings" },
  { url: "dolphin.jpg", title: "Into the blue" },
  { url: "eye.jpg", title: "Destruction vs Hope" },
  { url: "gd.png", title: "Google Doodle: Celebrating Science" },
  { url: "rangoli.JPG", title: "Rangoli: A Canvas of Tradition" },
  { url: "q.jpg", title: "Handcrafted Quilling Necklace" }
];

// Framer Motion staggered grid variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const HumanBento = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [flippedCard, setFlippedCard] = useState(null);

  const openCategory = (cat) => {
    setActiveCategory(cat);
    setFlippedCard(null);
  };

  const closeCategory = () => {
    setActiveCategory(null);
  };

  return (
    <section id="bento" className="bento-section">
      {/* Animated Tag and Heading */}
      <motion.div
        className="tag"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Human Mode
      </motion.div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Beyond the screen,
        <br />
        <span className="gradient-text">here is what inspires me.</span>
      </motion.h2>

      {/* BENTO GRID */}
      <motion.div
        className="bento-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card 1: Photography (2x2) */}
        <motion.div
          className="bento-card card-large glass"
          variants={cardVariants}
          whileHover={{ y: -8, rotate: -0.5 }}
          onClick={() => openCategory("lens")}
        >
          <div className="card-decor">📸 Travel & Street</div>

          <div className="polaroid-stack">
            <div className="stacked-polaroid polaroid1">
              <img src="/tml4.jpeg" alt="Travels" />
              <span>travels.</span>
            </div>
            <div className="stacked-polaroid polaroid2">
              <img src="/tml3.jpeg" alt="Moments" />
              <span>moments.</span>
            </div>
            <div className="stacked-polaroid polaroid3">
              <img src="/tml1.jpeg" alt="Streets" />
              <span>streets.</span>
            </div>
          </div>

          <div className="card-content">
            <h3>Through My Lens</h3>
            <p>Photography gallery, visual storytelling and everyday observations.</p>
          </div>
        </motion.div>

        {/* Card 2: Culinary Canvas (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
          variants={cardVariants}
          whileHover={{ y: -8, rotate: 1 }}
          onClick={() => openCategory("culinary")}
        >
          <div className="card-decor">🍝 Kitchen Logs</div>
          <div className="card-image-preview">
            <img src="/cc2.jpg" alt="Gnocchi" className="rounded-cover" />
          </div>
          <div className="card-content">
            <h3>Culinary Canvas</h3>
            <p>Cooking, baking and plating experiments from scratch.</p>
          </div>
        </motion.div>

        {/* Card 3: Curiosity Lab (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
          variants={cardVariants}
          whileHover={{ y: -8, rotate: -1 }}
          onClick={() => openCategory("lab")}
        >
          <div className="card-decor">🚀 Engineering</div>
          <div className="lab-preview">
            <div className="blueprint-line"></div>
            <div className="lab-icons">
              <i className="ri-cpu-line"></i>
              <i className="ri-anchor-line"></i>
              <i className="ri-sensor-line"></i>
            </div>
          </div>
          <div className="card-content">
            <h3>Curiosity Lab</h3>
            <p>Robotics, Arduino builds and STEM exploration concepts.</p>
          </div>
        </motion.div>

        {/* Card 4: Creations (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
          variants={cardVariants}
          whileHover={{ y: -8, rotate: 0.5 }}
          onClick={() => openCategory("art")}
        >
          <div className="card-decor">🎨 Craft & Draw</div>
          <div className="art-preview">
            <img src="creations.png" alt="Watercolors" />
          </div>
          <div className="card-content">
            <h3>Creations</h3>
            <p>Paintings, rangolis and paper quilling art logs.</p>
          </div>
        </motion.div>

        {/* Card 5: Motion & Stories (2x2) */}
        <motion.div
          className="bento-card card-large glass"
          variants={cardVariants}
          whileHover={{ y: -8, rotate: -0.5 }}
          onClick={() => openCategory("motion")}
        >
          <div className="card-decor">🎬 Editing & Reels</div>
          <div className="card-image-preview">
            <img src="motion.png" alt="Video editing timeline" className="rounded-cover" />
            <div className="video-play-overlay">
              <i className="ri-play-circle-fill"></i>
            </div>
          </div>
          <div className="card-content">
            <h3>Motion & Stories</h3>
            <p>Video editing, promotional clips and motion graphic loops.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* DETAILED CATEGORY MODALS */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            className="bento-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bento-modal-window glass"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Close Button */}
              <button className="close-modal-btn" onClick={closeCategory}>
                <i className="ri-close-line"></i>
              </button>

              {/* Modal Header */}
              <div className="modal-header">
                {activeCategory === "lens" && (
                  <>
                    <h2>📸 Through My Lens</h2>
                    <p>Wandering streets and collecting perspectives. Photography is how I capture shadows, contrast and emotions.</p>
                  </>
                )}
                {activeCategory === "culinary" && (
                  <>
                    <h2>🍝 Culinary Canvas</h2>
                    <p>Cooking, baking and plating. Food is edible art, teaching patience, iteration and visual styling.</p>
                  </>
                )}
                {activeCategory === "lab" && (
                  <>
                    <h2>🚀 Curiosity Lab</h2>
                    <p>Showcasing physical engineering experiments, microcontrollers and custom prototyping builds.</p>
                  </>
                )}
                {activeCategory === "art" && (
                  <>
                    <h2>🎨 Handmade & Illustrated</h2>
                    <p>Creating beyond the digital screen. Hand sketches, quilling crafts and organic watercolor splashes.</p>
                  </>
                )}
                {activeCategory === "motion" && (
                  <>
                    <h2>🎬 Motion & Stories</h2>
                    <p>Visual logs, promotional edits and motion design frames stitched together with music.</p>
                  </>
                )}
              </div>

              {/* Modal Scrollable Content */}
              <div className="modal-body-content">
                {/* 1. PHOTOGRAPHY POLAROID GALLERY */}
                {activeCategory === "lens" && (
                  <div className="polaroid-gallery">
                    {photographyData.map((photo, index) => (
                      <motion.div
                        className={`polaroid-gallery-item polaroid-rot-${index % 3}`}
                        key={index}
                        onClick={() => setLightboxImage(photo)}
                        whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="polaroid-image-wrapper">
                          <img src={photo.url} alt={photo.caption} />
                        </div>
                        <span className="polaroid-caption">{photo.caption}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* 2. CULINARY FLIP CARDS */}
                {activeCategory === "culinary" && (
                  <div className="recipe-grid">
                    {culinaryData.map((recipe, index) => (
                      <div
                        className={`recipe-card-wrapper ${flippedCard === index ? "flipped" : ""}`}
                        key={index}
                        onClick={() => setFlippedCard(flippedCard === index ? null : index)}
                      >
                        <div className="recipe-card-inner">
                          {/* Front */}
                          <div className="recipe-card-front">
                            <img src={recipe.image} alt={recipe.title} />
                            <div className="recipe-front-info">
                              <h3>{recipe.title}</h3>
                              <span className="tap-hint">Tap to read story <i className="ri-repeat-line"></i></span>
                            </div>
                          </div>
                          {/* Back */}
                          <div className="recipe-card-back">
                            <h3>{recipe.title}</h3>
                            <div className="recipe-section-block">
                              <strong>The Story:</strong>
                              <p>{recipe.story}</p>
                            </div>
                            <span className="tap-hint">Tap to flip back <i className="ri-repeat-line"></i></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. CURIOSITY LAB BLUEPRINTS */}
                {activeCategory === "lab" && (
                  <div className="blueprints-grid">
                    {labData.map((project, index) => (
                      <div className="blueprint-card" key={index}>
                        <div className="blueprint-video-wrapper">
                          <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="blueprint-video"
                          />
                        </div>
                        <div className="blueprint-info">
                          <div className="blueprint-header">
                            <span className="blueprint-tag">{project.tag}</span>
                            <span className="blueprint-no">BUILD-0{index + 1}</span>
                          </div>
                          <h3>{project.title}</h3>
                          <p className="bp-desc">{project.desc}</p>
                          <div className="bp-details">
                            <strong>Tech & Modules:</strong> {project.details}
                          </div>
                          <div className="bp-learned">
                            <strong>Lesson:</strong> {project.learned}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. HANDMADE ART GRID */}
                {activeCategory === "art" && (
                  <div className="art-gallery">
                    {artData.map((art, index) => (
                      <div
                        className="art-card-item"
                        key={index}
                        onClick={() => setLightboxImage({ url: art.url, caption: art.title })}
                      >
                        <div className="art-frame">
                          <img src={art.url} alt={art.title} />
                        </div>
                        <h4>{art.title}</h4>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. MOTION VIDEOS COMING SOON */}
                {activeCategory === "motion" && (
                  <div className="motion-coming-soon">
                    <i className="ri-vidicon-line"></i>
                    <h3>Working on it!</h3>
                    <p>Reels, visual edits and motion graphic loops are currently being compiled. Stay tuned for updates!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX FOR ART & PHOTOGRAPHY */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button className="close-lightbox-btn" onClick={() => setLightboxImage(null)}>
              <i className="ri-close-line"></i>
            </button>
            <motion.div
              className="lightbox-window"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <img src={lightboxImage.url} alt="" />
              {lightboxImage.caption && (
                <div className="lightbox-caption">{lightboxImage.caption}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HumanBento;
