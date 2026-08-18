// src/components/ObstacleCarDetail.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/smart-seat.css";

const ObstacleCarDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const componentsList = [
    {
      name: "8051 Microcontroller",
      role: "Central Processing Unit",
      desc: "Executes low-level Assembly routines, processes real-time sensor inputs and manages output indicators.",
      icon: "ri-cpu-line",
    },
    {
      name: "Ultrasonic Sensor",
      role: "Distance Measurement & Ranging",
      desc: "Emits high-frequency sonic pulses and measures return echo timing to calculate precise obstacle distance.",
      icon: "ri-radar-line",
    },
    {
      name: "IR Sensor Module",
      role: "Close-Range Proximity Detection",
      desc: "Infrared emitter and receiver pair detecting immediate obstructions in front of the vehicle path.",
      icon: "ri-sensor-line",
    },
    {
      name: "Buzzer & LED Indicators",
      role: "Audio-Visual Alert System",
      desc: "Provides immediate visual flash cues and audible alarm beeps whenever an obstacle is detected.",
      icon: "ri-alarm-warning-line",
    },
    {
      name: "Batteries & Power Unit",
      role: "DC Power Supply",
      desc: "Battery pack delivering steady voltage to power the 8051 microcontroller, sensors, LEDs and motors.",
      icon: "ri-battery-2-charge-line",
    },
  ];

  return (
    <motion.div
      className="smart-seat-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* BACK BUTTON */}
      <div className="smart-seat-nav">
        <Link to="/" className="back-btn">
          <i className="ri-arrow-left-line"></i> Back to Portfolio
        </Link>
      </div>

      {/* HERO SECTION */}
      <header className="smart-seat-header">
        <div className="tag">ROBOTICS • ASSEMBLY LANGUAGE • MPMC</div>
        <h1>Obstacle Detection Car</h1>
        <p className="subtitle">
          An autonomous obstacle-detection robotic car powered by an 8051 microcontroller, ultrasonic sensor, IR sensor, LED indicators, audio buzzer and low-level Assembly language programming.
        </p>

        <div className="tech-stack-row">
          {["8051 Microcontroller", "Assembly Language", "Ultrasonic Sensor", "IR Sensor", "Buzzer", "LEDs", "Batteries"].map((item, i) => (
            <span key={i} className="tech-pill">
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* VIDEO / MEDIA BANNER */}
      <section className="media-banner-section">
        <div className="media-banner-wrapper glass">
          <video
            src="/od.mov"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="smart-seat-main-img"
          />
        </div>
      </section>

      {/* OVERVIEW & HIGHLIGHTS */}
      <section className="details-grid-section">
        <div className="detail-card glass">
          <div className="card-icon"><i className="ri-radar-line"></i></div>
          <h3>Ultrasonic & IR Ranging</h3>
          <p>
            Combines sonic pulse timing and infrared proximity sensing to detect obstacles across both near and medium ranges.
          </p>
        </div>

        <div className="detail-card glass">
          <div className="card-icon"><i className="ri-alarm-warning-line"></i></div>
          <h3>Audio & Visual Alerts</h3>
          <p>
            Triggers bright LED indicators and an audio buzzer alarm whenever an obstacle breaches proximity limits.
          </p>
        </div>

        <div className="detail-card glass">
          <div className="card-icon"><i className="ri-battery-charge-line"></i></div>
          <h3>Autonomous Battery Locomotion</h3>
          <p>
            Self-powered mobile chassis with onboard DC battery supply powering continuous motor movement and sensor circuitry.
          </p>
        </div>
      </section>

      {/* HARDWARE BREAKDOWN */}
      <section className="sensor-matrix-section">
        <h2>Hardware Component Matrix</h2>
        <p className="section-desc">Key physical components and electronic modules powering the obstacle detection car.</p>

        <div className="sensors-list">
          {componentsList.map((comp, index) => (
            <div key={index} className="sensor-item glass">
              <div className="sensor-header">
                <i className={comp.icon}></i>
                <div>
                  <h4>{comp.name}</h4>
                  <span className="sensor-role">{comp.role}</span>
                </div>
              </div>
              <p>{comp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER NAV */}
      <footer className="smart-seat-footer">
        <Link to="/" className="primary-btn">
          ← Back to All Projects
        </Link>
      </footer>
    </motion.div>
  );
};

export default ObstacleCarDetail;
