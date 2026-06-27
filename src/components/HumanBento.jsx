// src/components/HumanBento.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/human.css";

// 📸 Photography gallery data
const photographyData = [
  { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800", caption: "Sunrise boat ride, chasing reflections", category: "travel" },
  { url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800", caption: "Foggy mornings in the woods", category: "nature" },
  { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800", caption: "Cozy café corners & city lights", category: "street" },
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", caption: "Espresso talks & quiet hours", category: "everyday" },
  { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800", caption: "Fresh greens & color palettes", category: "food" },
  { url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800", caption: "Lost in transit, wanderlust moments", category: "travel" }
];

// 🍝 Culinary canvas data
const culinaryData = [
  {
    title: "Homemade Potato Gnocchi",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=600",
    story: "Attempted making Italian gnocchi from scratch. Boiling potatoes to the right consistency and rolling them over a fork to get the classic ridges is almost therapeutic.",
    learned: "Patience and texture control. If potatoes are too hot, the dough absorbs too much flour and gets heavy. Keep it light!"
  },
  {
    title: "Slow-Cooked Tomato Ragù",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600",
    story: "Simmered tomatoes, fresh basil, garlic, and red wine for 4 hours. The aroma filled the house, making the wait absolutely worth it.",
    learned: "Low & slow is key. You can't rush flavor extraction. Iteration makes a simple recipe extraordinary."
  },
  {
    title: "Classic Crème Brûlée",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600",
    story: "Infused cream with vanilla bean pod and caramelized the sugar crust with a blowtorch. Watching the sugar bubble and harden is pure magic.",
    learned: "Contrast is design. The crunch of the burnt sugar against the velvety custard is what makes this dessert unforgettable."
  }
];

// 🚀 Curiosity Lab engineering builds
const labData = [
  {
    title: "Working River Cleaning Boat",
    tag: "STEM / Environment",
    desc: "Built a solar-powered prototype vessel equipped with a mechanical conveyor belt to skim floating garbage off lakes and rivers. Features wireless control and autonomous obstacle avoidance.",
    details: "Utilized lightweight PVC floats, high-torque DC motors, and solar controllers. Programmed with Arduino to monitor battery cells and telemetry.",
    learned: "Hydrodynamics and mechanical loading. Learned to optimize power ratios so solar cells can charge while motors run."
  },
  {
    title: "Gesture-Controlled Tele-presence Arm",
    tag: "Robotics / Sensors",
    desc: "A robotic arm that replicates hand movements using gesture flex sensors and IMU accelerators mounted on an operator's glove.",
    details: "Engineered with servo motors, Arduino Nano, and RF wireless transceivers. Smoothed telemetry with moving average filters.",
    learned: "Sensor signal noise filtration. Calibrating variable resistance from fingers requires dynamic thresholding."
  },
  {
    title: "Smart Irrigation & Soil Telemetry",
    tag: "Arduino / IoT",
    desc: "An automated watering unit that monitors volumetric water content in soil and uploads data to a custom web interface.",
    details: "Uses capacitive moisture sensors, ESP8266 Wi-Fi, and solar power harvesting.",
    learned: "Power consumption optimization. Deep sleep cycles on microcontrollers are vital for long-term deployments."
  }
];

// 🎨 Handmade art pieces
const artData = [
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800", title: "Floral Watercolor Painting" },
  { url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800", title: "Charcoal Portrait Sketch" },
  { url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800", title: "Intricate Quilling Paper Craft" },
  { url: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=800", title: "Abstract Acrylic Canvas" }
];

// 🎬 Motion & Stories video edits
const motionData = [
  { title: "Robotics Fest Promo Reel", duration: "1:15", type: "Club Event Edit", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600" },
  { title: "Motion Graphics Showcase", duration: "0:45", type: "Visual FX", thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600" },
  { title: "Travel Log: Chennai Coastline", duration: "2:00", type: "Cinematic B-Roll", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600" }
];

// ✨ Creative Chaos logs
const chaosData = [
  { title: "Rebranding: Local Bakery", type: "Logo Explorations", desc: "Crafted minimal, warm typography logs combining wheat shapes and coffee cups." },
  { title: "Visual Design Poster: Cyberpunk Chennai", type: "Poster Art", desc: "A creative exercise merging retro neon overlays with Chennai local trains." },
  { title: "Figma UI Playground: Polaroid Journal", type: "UX Concept", desc: "Experimental layout that inspired the Human Mode of this very website." }
];

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
      <div className="tag">Human Mode</div>
      <h2 className="section-title">
        Beyond the screen,
        <br />
        <span className="gradient-text">here is what inspires me.</span>
      </h2>
      <p className="section-subtitle">
        Click on any category card below to flip open the journal pages, travel logs, food experiments, and design labs.
      </p>

      {/* BENTO GRID */}
      <div className="bento-grid">

        {/* Card 1: Photography (2x2) */}
        <motion.div
          className="bento-card card-large glass"
          whileHover={{ y: -8, rotate: -0.5 }}
          onClick={() => openCategory("lens")}
        >
          <div className="card-decor">📸 Travel & Street</div>
          <div className="polaroid-stack">
            <div className="stacked-polaroid polaroid1">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=250" alt="" />
              <span>travels.</span>
            </div>
            <div className="stacked-polaroid polaroid2">
              <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=250" alt="" />
              <span>moments.</span>
            </div>
          </div>
          <div className="card-content">
            <h3>Through My Lens</h3>
            <p>Photography gallery, visual storytelling, and everyday observations.</p>
          </div>
        </motion.div>

        {/* Card 2: Culinary Canvas (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
          whileHover={{ y: -8, rotate: 1 }}
          onClick={() => openCategory("culinary")}
        >
          <div className="card-decor">🍝 Kitchen Logs</div>
          <div className="card-image-preview">
            <img src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=300" alt="Gnocchi" className="rounded-cover" />
          </div>
          <div className="card-content">
            <h3>Culinary Canvas</h3>
            <p>Cooking, baking, and plating experiments from scratch.</p>
          </div>
        </motion.div>

        {/* Card 3: Curiosity Lab (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
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
            <p>Robotics, Arduino builds, and STEM exploration concepts.</p>
          </div>
        </motion.div>

        {/* Card 4: Handmade Art (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
          whileHover={{ y: -8, rotate: 0.5 }}
          onClick={() => openCategory("art")}
        >
          <div className="card-decor">🎨 Craft & Draw</div>
          <div className="art-preview">
            <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=250" alt="Watercolors" />
          </div>
          <div className="card-content">
            <h3>Handmade & Illustrated</h3>
            <p>Paintings, sketches, and paper quilling art logs.</p>
          </div>
        </motion.div>

        {/* Card 5: Motion & Video (2x2) */}
        <motion.div
          className="bento-card card-large glass"
          whileHover={{ y: -8, rotate: -0.5 }}
          onClick={() => openCategory("motion")}
        >
          <div className="card-decor">🎬 Editing & Reels</div>
          <div className="card-image-preview">
            <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600" alt="Video editing preview" className="rounded-cover" />
            <div className="video-play-overlay">
              <i className="ri-play-circle-fill"></i>
            </div>
          </div>
          <div className="card-content">
            <h3>Motion & Stories</h3>
            <p>Video editing, promotional clips, and motion graphic loops.</p>
          </div>
        </motion.div>

        {/* Card 6: Creative Chaos (1x2) */}
        <motion.div
          className="bento-card card-medium glass"
          whileHover={{ y: -8, rotate: -1 }}
          onClick={() => openCategory("chaos")}
        >
          <div className="card-decor">✨ Side Drafts</div>
          <div className="card-image-preview">
            <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600" alt="Chaos preview" className="rounded-cover" />
          </div>
          <div className="card-content">
            <h3>Creative Chaos</h3>
            <p>Logo redesigns, graphic drafts, and random mockups.</p>
          </div>
        </motion.div>

      </div>

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
                    <p>Wandering streets and collecting perspectives. Photography is how I capture shadows, contrast, and emotions.</p>
                  </>
                )}
                {activeCategory === "culinary" && (
                  <>
                    <h2>🍝 Culinary Canvas</h2>
                    <p>Cooking, baking, and plating. Food is edible art, teaching patience, iteration, and visual styling.</p>
                  </>
                )}
                {activeCategory === "lab" && (
                  <>
                    <h2>🚀 Curiosity Lab</h2>
                    <p>Showcasing physical engineering experiments, microcontrollers, and custom prototyping builds.</p>
                  </>
                )}
                {activeCategory === "art" && (
                  <>
                    <h2>🎨 Handmade & Illustrated</h2>
                    <p>Creating beyond the digital screen. Hand sketches, quilling crafts, and organic watercolor splashes.</p>
                  </>
                )}
                {activeCategory === "motion" && (
                  <>
                    <h2>🎬 Motion & Stories</h2>
                    <p>Visual logs, promotional edits, and motion design frames stitched together with music.</p>
                  </>
                )}
                {activeCategory === "chaos" && (
                  <>
                    <h2>✨ Creative Chaos</h2>
                    <p>Unfinished graphics, random drafts, logos, and snippets of ideas that deserve a home.</p>
                  </>
                )}
              </div>

              {/* Modal Scrollable Content */}
              <div className="modal-body-content">

                {/* 1. PHOTOGRAPHY GRID */}
                {activeCategory === "lens" && (
                  <div className="masonry-gallery">
                    {photographyData.map((photo, index) => (
                      <div
                        className="masonry-item polaroid-photo"
                        key={index}
                        onClick={() => setLightboxImage(photo)}
                      >
                        <img src={photo.url} alt={photo.caption} />
                        <div className="polaroid-caption">{photo.caption}</div>
                      </div>
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
                            <div className="recipe-section-block learned-block">
                              <strong>What I Learned:</strong>
                              <p>{recipe.learned}</p>
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

                {/* 5. MOTION VIDEOS GRID */}
                {activeCategory === "motion" && (
                  <div className="motion-grid">
                    {motionData.map((video, index) => (
                      <div className="video-card" key={index}>
                        <div className="video-thumb-container">
                          <img src={video.thumbnail} alt={video.title} />
                          <div className="video-play-overlay">
                            <i className="ri-play-circle-line"></i>
                          </div>
                          <span className="video-duration">{video.duration}</span>
                        </div>
                        <div className="video-info">
                          <span className="video-tag">{video.type}</span>
                          <h3>{video.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 6. CREATIVE CHAOS */}
                {activeCategory === "chaos" && (
                  <div className="chaos-grid">
                    {chaosData.map((chaos, index) => (
                      <div className="chaos-card" key={index}>
                        <span className="chaos-tag">{chaos.type}</span>
                        <h3>{chaos.title}</h3>
                        <p>{chaos.desc}</p>
                      </div>
                    ))}
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
              <img src={lightboxImage.url} alt={lightboxImage.caption} />
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
