// src/components/CreativeWork.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/creative.css";

const photographyData = [
  { url: "/tml1.jpeg", caption: "Sun-dappled Greenhouse" },
  { url: "/tml2.jpeg", caption: "Urban Contemplation" },
  { url: "/tml3.jpeg", caption: "Mist-covered Lake" },
  { url: "/tml4.jpeg", caption: "Polaroid Travels" },
  { url: "/tml5.JPG", caption: "Warm Cafes & Lights" },
  { url: "/tml6.JPG", caption: "Golden Hour Textures" },
  { url: "/tml7.JPG", caption: "Everyday Shadows" },
];

const artData = [
  { url: "/rabbit.jpg", title: "Whiskers & Wings" },
  { url: "/dolphin.jpg", title: "Into the Blue" },
  { url: "/eye.jpg", title: "Destruction vs Hope" },
  { url: "/gd.png", title: "Google Doodle: Celebrating Science" },
  { url: "/rangoli.JPG", title: "Rangoli: Canvas of Tradition" },
  { url: "/q.jpg", title: "Handcrafted Quilling" },
];

const CreativeWork = () => {
  const [activeTab, setActiveTab] = useState("PHOTOGRAPHY");
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <motion.section
      id="creative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="tag">Creative Endeavors</div>

      <h2 className="section-title">
        BEYOND <span className="gradient-text">THE CODE</span>
      </h2>

      <p className="section-subtitle">
        Exploring visual design, photography, hand sketches, and creative side experiments.
      </p>

      {/* TABS */}
      <div className="creative-tabs">
        <button
          className={`creative-tab ${activeTab === "PHOTOGRAPHY" ? "active" : ""}`}
          onClick={() => setActiveTab("PHOTOGRAPHY")}
        >
          📸 PHOTOGRAPHY
        </button>
        <button
          className={`creative-tab ${activeTab === "ART" ? "active" : ""}`}
          onClick={() => setActiveTab("ART")}
        >
          🎨 SKETCHES & ART
        </button>
      </div>

      {/* CONTENT GRID */}
      <div className="creative-grid-container">
        {activeTab === "PHOTOGRAPHY" && (
          <motion.div
            key="photo-grid"
            className="creative-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {photographyData.map((photo, i) => (
              <motion.div
                key={i}
                className="creative-card glass"
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setLightboxImage(photo)}
              >
                <div className="creative-img-wrapper">
                  <img src={photo.url} alt={photo.caption} />
                </div>
                <div className="creative-card-caption">{photo.caption}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "ART" && (
          <motion.div
            key="art-grid"
            className="creative-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {artData.map((art, i) => (
              <motion.div
                key={i}
                className="creative-card glass"
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setLightboxImage({ url: art.url, caption: art.title })}
              >
                <div className="creative-img-wrapper">
                  <img src={art.url} alt={art.title} />
                </div>
                <div className="creative-card-caption">{art.title}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* LIGHTBOX */}
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
    </motion.section>
  );
};

export default CreativeWork;
