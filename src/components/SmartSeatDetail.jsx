// src/components/SmartSeatDetail.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/smart-seat.css";

const SmartSeatDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sensors = [
    {
      name: "FSR (Force Sensitive Resistor)",
      role: "Student Presence & Weight Distribution",
      desc: "Detects physical presence on the seat and analyzes seating weight pressure to identify restlessness or improper seating posture.",
      icon: "ri-weight-line",
    },
    {
      name: "MPU6050 (3-Axis Gyro + Accelerometer)",
      role: "Posture & Motion Telemetry",
      desc: "Monitors back angle, slumping, leaning tendencies, and micro-movements to evaluate ergonomic seating health.",
      icon: "ri-compass-3-line",
    },
    {
      name: "MAX30100 (Pulse Oximeter & Heart Rate)",
      role: "Vital Signs & SpO2 Monitoring",
      desc: "Optical sensor for non-invasive heart rate and blood oxygen saturation tracking to detect physical distress.",
      icon: "ri-heart-pulse-line",
    },
    {
      name: "DS18B20 (Digital Temperature Sensor)",
      role: "Body Temperature Monitoring",
      desc: "High-accuracy thermal sensor providing real-time body temperature data for fever detection and stress alerts.",
      icon: "ri-temp-hot-line",
    },
    {
      name: "ESP32-CAM (Wi-Fi Camera Module)",
      role: "Visual Engagement & Telemetry",
      desc: "Captures visual cues for facial focus analysis, logging engagement metrics and streaming live telemetry over Wi-Fi.",
      icon: "ri-camera-3-line",
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
        <div className="tag">ROBOTICS • SENSOR FUSION • IoT</div>
        <h1>Smart Classroom Seat</h1>
        <p className="subtitle">
          An Arduino & ESP32-CAM powered multi-sensor intelligent seat designed to monitor student presence, posture, health metrics, engagement, and stress levels in real-time.
        </p>

        <div className="tech-stack-row">
          {["Arduino", "ESP32-CAM", "FSR", "MPU6050", "MAX30100", "DS18B20", "Embedded C++", "Sensor Fusion"].map((item, i) => (
            <span key={i} className="tech-pill">
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* IMAGE / MEDIA BANNER */}
      <section className="media-banner-section">
        <div className="media-banner-wrapper glass">
          <img
            src="/smart-seat.jpg"
            alt="Smart Classroom Seat Project"
            className="smart-seat-main-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="img-placeholder-fallback" style={{ display: "none" }}>
            <i className="ri-cpu-line placeholder-icon"></i>
            <h3>Smart Classroom Seat Media</h3>
            <p>Place <code>smart-seat.jpg</code> in the <code>public/</code> folder to display your image here.</p>
          </div>
        </div>
      </section>

      {/* OVERVIEW & HIGHLIGHTS */}
      <section className="details-grid-section">
        <div className="detail-card glass">
          <div className="card-icon"><i className="ri-pulse-line"></i></div>
          <h3>Real-Time Sensor Fusion</h3>
          <p>
            Integrates multiple sensor streams through sensor fusion algorithms to cross-validate physiological indicators with postural changes.
          </p>
        </div>

        <div className="detail-card glass">
          <div className="card-icon"><i className="ri-shield-flash-line"></i></div>
          <h3>Abnormal Alerts System</h3>
          <p>
            Triggers instant automated warnings for severe slouching, abnormal heart rates, sudden stress spikes, or prolonged absenteeism.
          </p>
        </div>

        <div className="detail-card glass">
          <div className="card-icon"><i className="ri-wifi-line"></i></div>
          <h3>IoT Telemetry & Analytics</h3>
          <p>
            Streams data wirelessly via ESP32-CAM to a centralized dashboard for classroom-wide engagement and wellness insights.
          </p>
        </div>
      </section>

      {/* SENSOR BREAKDOWN */}
      <section className="sensor-matrix-section">
        <h2>Hardware Sensor Matrix</h2>
        <p className="section-desc">Detailed multi-sensor hardware architecture powering the smart seat ecosystem.</p>

        <div className="sensors-list">
          {sensors.map((sensor, index) => (
            <div key={index} className="sensor-item glass">
              <div className="sensor-header">
                <i className={sensor.icon}></i>
                <div>
                  <h4>{sensor.name}</h4>
                  <span className="sensor-role">{sensor.role}</span>
                </div>
              </div>
              <p>{sensor.desc}</p>
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

export default SmartSeatDetail;
