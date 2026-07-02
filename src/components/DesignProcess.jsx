// src/components/DesignProcess.jsx

import "../styles/process.css";
import { motion } from "framer-motion";
const steps = [
  {
    title: "Research & Discovery",
    points: "User Research • Competitor Analysis • Pain Points • User Journey",
  },

  {
    title: "Wireframing",
    points: "Low-Fidelity Layouts • Information Architecture",
  },

  {
    title: "Visual Design",
    points: "Typography • Color System • Visual Hierarchy • UI Consistency",
  },

  {
    title: "Prototyping",
    points: "Interactive Flows • Microinteractions",
  },

  {
    title: "Testing & Refinement",
    points: "Feedback Iterations • Accessibility • Surveys • A/B Testing ",
  },
];

const DesignProcess = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.section
      id="process"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="tag">
        Design Process
      </motion.div>

      <motion.h2 variants={itemVariants} className="section-title">
        Thoughtful process.
        <br />
        <span className="gradient-text">Human-centered outcomes.</span>
      </motion.h2>

      <motion.div 
        className="process-wrapper"
        variants={containerVariants}
      >
        {steps.map((step, index) => (
          <motion.div 
            className="process-card glass" 
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03, x: 8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          >
            <span>
              0{index + 1}
            </span>

            <div className="process-content">
              <h3>
                {step.title}
              </h3>
              <p>
                {step.points}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default DesignProcess;