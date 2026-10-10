// src/components/CMSAdminModal.jsx

import { useState } from "react";
import {
  getProjects,
  saveProjects,
  resetProjects,
  getExperiences,
  saveExperiences,
  resetExperiences,
} from "../cms/cmsStore";
import "../styles/cmsAdmin.css";

const CMSAdminModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjectsState] = useState(() => getProjects());
  const [experiences, setExperiencesState] = useState(() => getExperiences());
  const [notification, setNotification] = useState("");

  if (!isOpen) return null;

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  /* ─── PROJECTS HANDLERS ─── */
  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjectsState(updated);
  };

  const handleProjectArrayChange = (index, field, commaSeparatedString) => {
    const updated = [...projects];
    const arr = commaSeparatedString.split(",").map((s) => s.trim()).filter(Boolean);
    updated[index] = { ...updated[index], [field]: arr };
    setProjectsState(updated);
  };

  const handleAddProject = () => {
    const newProject = {
      id: "project-" + Date.now(),
      title: "New Project",
      desc: "Project description and overview.",
      image: "/p.jpg",
      isVideo: false,
      categories: ["FRONTEND"],
      categoryLabel: "FRONTEND • UI/UX",
      techStack: ["React", "JavaScript", "CSS"],
      link: "https://github.com",
      buttonText: "VIEW PROJECT",
    };
    const updated = [newProject, ...projects];
    setProjectsState(updated);
    saveProjects(updated);
    showToast("Added new project!");
  };

  const handleDeleteProject = (index) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const updated = projects.filter((_, i) => i !== index);
    setProjectsState(updated);
    saveProjects(updated);
    showToast("Project deleted.");
  };

  const handleSaveProjects = () => {
    saveProjects(projects);
    showToast("Projects saved to CMS storage!");
  };

  const handleExportProjectsJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(projects, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "projectsData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported projectsData.json!");
  };

  /* ─── EXPERIENCE HANDLERS ─── */
  const handleExperienceChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiencesState(updated);
  };

  const handleExperienceSkillsChange = (index, commaSeparatedString) => {
    const updated = [...experiences];
    const arr = commaSeparatedString.split(",").map((s) => s.trim()).filter(Boolean);
    updated[index] = { ...updated[index], skills: arr };
    setExperiencesState(updated);
  };

  const handleAddExperience = () => {
    const newExp = {
      id: "exp-" + Date.now(),
      role: "New Role / Position",
      company: "Company / Organization",
      duration: "Month Year - Present",
      desc: "Key achievements, responsibilities and learnings.",
      skills: ["Skill 1", "Skill 2"],
    };
    const updated = [newExp, ...experiences];
    setExperiencesState(updated);
    saveExperiences(updated);
    showToast("Added new experience entry!");
  };

  const handleDeleteExperience = (index) => {
    if (!window.confirm("Are you sure you want to delete this experience entry?")) return;
    const updated = experiences.filter((_, i) => i !== index);
    setExperiencesState(updated);
    saveExperiences(updated);
    showToast("Experience entry deleted.");
  };

  const handleSaveExperiences = () => {
    saveExperiences(experiences);
    showToast("Experiences saved to CMS storage!");
  };

  const handleExportExperiencesJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(experiences, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "experienceData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported experienceData.json!");
  };

  return (
    <div className="cms-admin-backdrop" onClick={onClose}>
      <div className="cms-admin-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="cms-header">
          <div className="cms-header-title">
            <span className="cms-badge">LOCAL CMS</span>
            <h2>Portfolio Content Manager</h2>
          </div>
          <button className="cms-close-btn" onClick={onClose} aria-label="Close CMS">
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="cms-tabs">
          <button
            className={`cms-tab-btn ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects ({projects.length})
          </button>
          <button
            className={`cms-tab-btn ${activeTab === "experiences" ? "active" : ""}`}
            onClick={() => setActiveTab("experiences")}
          >
            Experience & Roles ({experiences.length})
          </button>
        </div>

        {/* BODY */}
        <div className="cms-body">
          {notification && <div className="cms-toast" style={{ marginBottom: "16px" }}>✓ {notification}</div>}

          {activeTab === "projects" && (
            <div>
              <div className="cms-toolbar">
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="cms-btn-primary" onClick={handleAddProject}>
                    + Add New Project
                  </button>
                  <button className="cms-btn-secondary" onClick={handleSaveProjects}>
                    Save Changes
                  </button>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="cms-btn-secondary" onClick={handleExportProjectsJson}>
                    Export JSON
                  </button>
                  <button
                    className="cms-btn-danger"
                    onClick={() => {
                      if (window.confirm("Reset projects to default seed data?")) {
                        const reset = resetProjects();
                        setProjectsState(reset);
                        showToast("Reset to defaults.");
                      }
                    }}
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              <div className="cms-items-list">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="cms-item-card">
                    <div className="cms-item-header">
                      <span className="cms-item-title">#{idx + 1} {proj.title}</span>
                      <div className="cms-item-actions">
                        <button
                          className="cms-btn-danger"
                          onClick={() => handleDeleteProject(idx)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="cms-form-grid">
                      <div className="cms-form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.title || ""}
                          onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Category Label (e.g. FRONTEND • UI/UX)</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.categoryLabel || ""}
                          onChange={(e) => handleProjectChange(idx, "categoryLabel", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Filter Categories (comma separated)</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.categories ? proj.categories.join(", ") : ""}
                          onChange={(e) => handleProjectArrayChange(idx, "categories", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Image / Media Path</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.image || ""}
                          onChange={(e) => handleProjectChange(idx, "image", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Link (URL or Case Study route)</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.link || ""}
                          onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Button Label</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.buttonText || ""}
                          onChange={(e) => handleProjectChange(idx, "buttonText", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group full-width">
                        <label>Tech Stack Pills (comma separated)</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={proj.techStack ? proj.techStack.join(", ") : ""}
                          onChange={(e) => handleProjectArrayChange(idx, "techStack", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group full-width">
                        <label>Description</label>
                        <textarea
                          className="cms-textarea"
                          value={proj.desc || ""}
                          onChange={(e) => handleProjectChange(idx, "desc", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "experiences" && (
            <div>
              <div className="cms-toolbar">
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="cms-btn-primary" onClick={handleAddExperience}>
                    + Add Experience Entry
                  </button>
                  <button className="cms-btn-secondary" onClick={handleSaveExperiences}>
                    Save Changes
                  </button>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="cms-btn-secondary" onClick={handleExportExperiencesJson}>
                    Export JSON
                  </button>
                  <button
                    className="cms-btn-danger"
                    onClick={() => {
                      if (window.confirm("Reset experience to default seed data?")) {
                        const reset = resetExperiences();
                        setExperiencesState(reset);
                        showToast("Reset to defaults.");
                      }
                    }}
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              <div className="cms-items-list">
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="cms-item-card">
                    <div className="cms-item-header">
                      <span className="cms-item-title">#{idx + 1} {exp.role} @ {exp.company}</span>
                      <div className="cms-item-actions">
                        <button
                          className="cms-btn-danger"
                          onClick={() => handleDeleteExperience(idx)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="cms-form-grid">
                      <div className="cms-form-group">
                        <label>Role / Title</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={exp.role || ""}
                          onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Company / Organization</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={exp.company || ""}
                          onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group">
                        <label>Duration / Period</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={exp.duration || ""}
                          onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group full-width">
                        <label>Skills / Tags (comma separated)</label>
                        <input
                          type="text"
                          className="cms-input"
                          value={exp.skills ? exp.skills.join(", ") : ""}
                          onChange={(e) => handleExperienceSkillsChange(idx, e.target.value)}
                        />
                      </div>

                      <div className="cms-form-group full-width">
                        <label>Description</label>
                        <textarea
                          className="cms-textarea"
                          value={exp.desc || ""}
                          onChange={(e) => handleExperienceChange(idx, "desc", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CMSAdminModal;
