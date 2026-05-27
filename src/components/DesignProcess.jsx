// src/components/DesignProcess.jsx

import "../styles/process.css";

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
  return (
    <section id="process">

      <div className="tag">
        Design Process
      </div>

      <h2 className="section-title">
        Thoughtful process.
        <br />
        Human-centered outcomes.
      </h2>

      <div className="process-wrapper">

        {steps.map((step, index) => (

          <div className="process-card glass" key={index}>

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

          </div>

        ))}

      </div>

    </section>
  );
};

export default DesignProcess;