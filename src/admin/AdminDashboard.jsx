// src/admin/AdminDashboard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getProjects,
  saveProjects,
  resetProjects,
  getExperiences,
  saveExperiences,
  resetExperiences,
  getSkills,
  saveSkills,
  resetSkills,
  getCertifications,
  saveCertifications,
  resetCertifications,
  getAbout,
  saveAbout,
  resetAbout,
  getBlogs,
  saveBlogs,
  resetBlogs,
  exportFullBackup,
  importFullBackup,
  updateAdminPasskey,
  logout,
} from "../cms/cmsStore";
import "../styles/admin.css";

const AdminDashboard = ({ onLogout }) => {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Entity States
  const [projects, setProjects] = useState(() => getProjects());
  const [experiences, setExperiences] = useState(() => getExperiences());
  const [skills, setSkills] = useState(() => getSkills());
  const [certifications, setCertifications] = useState(() => getCertifications());
  const [about, setAbout] = useState(() => getAbout());
  const [blogs, setBlogs] = useState(() => getBlogs());

  // Search filter query
  const [searchQuery, setSearchQuery] = useState("");

  // Settings state
  const [newPasskey, setNewPasskey] = useState("");
  const [passkeySuccess, setPasskeySuccess] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  /* ─── IMAGE FILE UPLOADER HELPER ─── */
  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
      showToast("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  /* ─── REORDER HELPER ─── */
  const moveItem = (list, setList, saveFunc, index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const updated = [...list];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIdx, 0, moved);
    setList(updated);
    saveFunc(updated);
    showToast("Order updated.");
  };

  /* ─── PROJECTS CRUD ─── */
  const handleProjectField = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleProjectArray = (index, field, commaString) => {
    const arr = commaString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: arr };
    setProjects(updated);
  };

  const addProject = () => {
    const newItem = {
      id: "project-" + Date.now(),
      title: "New Project",
      desc: "Short project summary.",
      image: "/p.jpg",
      categories: ["FRONTEND"],
      categoryLabel: "FRONTEND • UI/UX",
      techStack: ["React", "JavaScript", "CSS"],
      problem: "",
      process: "",
      designDecisions: "",
      outcome: "",
      link: "https://github.com",
      github: "https://github.com",
      buttonText: "VIEW PROJECT",
      published: true,
      featured: true,
    };
    const updated = [newItem, ...projects];
    setProjects(updated);
    saveProjects(updated);
    showToast("Project created.");
  };

  const deleteProject = (index) => {
    if (!window.confirm("Delete this project?")) return;
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    saveProjects(updated);
    showToast("Project deleted.");
  };

  const saveProjectsChanges = () => {
    saveProjects(projects);
    showToast("Projects saved successfully!");
  };

  /* ─── EXPERIENCE CRUD ─── */
  const handleExpField = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleExpSkills = (index, commaString) => {
    const arr = commaString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = [...experiences];
    updated[index] = { ...updated[index], skills: arr };
    setExperiences(updated);
  };

  const addExperience = () => {
    const newItem = {
      id: "exp-" + Date.now(),
      role: "Position / Role",
      company: "Company / Organization",
      duration: "Month Year - Present",
      desc: "Key accomplishments and responsibilities.",
      skills: ["Skill 1", "Skill 2"],
      published: true,
      featured: true,
    };
    const updated = [newItem, ...experiences];
    setExperiences(updated);
    saveExperiences(updated);
    showToast("Experience added.");
  };

  const deleteExperience = (index) => {
    if (!window.confirm("Delete this experience entry?")) return;
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    saveExperiences(updated);
    showToast("Experience deleted.");
  };

  const saveExperienceChanges = () => {
    saveExperiences(experiences);
    showToast("Experiences saved successfully!");
  };

  /* ─── SKILLS CRUD ─── */
  const handleSkillField = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const handleSkillItems = (index, commaString) => {
    const arr = commaString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = [...skills];
    updated[index] = { ...updated[index], skills: arr };
    setSkills(updated);
  };

  const addSkillCategory = () => {
    const newItem = {
      id: "skill-" + Date.now(),
      title: "NEW CATEGORY",
      skills: ["Skill A", "Skill B"],
      icon: "ri-code-box-line",
      published: true,
      order: skills.length + 1,
    };
    const updated = [...skills, newItem];
    setSkills(updated);
    saveSkills(updated);
    showToast("Skill category added.");
  };

  const deleteSkillCategory = (index) => {
    if (!window.confirm("Delete this skill category?")) return;
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    saveSkills(updated);
    showToast("Skill category deleted.");
  };

  const saveSkillsChanges = () => {
    saveSkills(skills);
    showToast("Skills saved successfully!");
  };

  /* ─── CERTIFICATIONS CRUD ─── */
  const handleCertField = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], [field]: value };
    setCertifications(updated);
  };

  const addCertification = () => {
    const newItem = {
      id: "cert-" + Date.now(),
      name: "Certificate Name",
      issuer: "Issuing Organization",
      date: "2026",
      credentialUrl: "",
      image: "",
      published: true,
    };
    const updated = [newItem, ...certifications];
    setCertifications(updated);
    saveCertifications(updated);
    showToast("Certification added.");
  };

  const deleteCertification = (index) => {
    if (!window.confirm("Delete this certification?")) return;
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
    saveCertifications(updated);
    showToast("Certification deleted.");
  };

  const saveCertificationsChanges = () => {
    saveCertifications(certifications);
    showToast("Certifications saved successfully!");
  };

  /* ─── ABOUT CRUD ─── */
  const handleAboutField = (field, value) => {
    const updated = { ...about, [field]: value };
    setAbout(updated);
  };

  const handleCapabilityField = (index, field, value) => {
    const caps = [...(about.capabilities || [])];
    caps[index] = { ...caps[index], [field]: value };
    const updated = { ...about, capabilities: caps };
    setAbout(updated);
  };

  const saveAboutChanges = () => {
    saveAbout(about);
    showToast("About section saved successfully!");
  };

  /* ─── BLOGS CRUD ─── */
  const handleBlogField = (index, field, value) => {
    const updated = [...blogs];
    updated[index] = { ...updated[index], [field]: value };
    setBlogs(updated);
  };

  const handleBlogTags = (index, commaString) => {
    const arr = commaString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = [...blogs];
    updated[index] = { ...updated[index], tags: arr };
    setBlogs(updated);
  };

  const addBlog = () => {
    const newItem = {
      id: "blog-" + Date.now(),
      title: "New Post / Article",
      thumbnail: "/u.png",
      summary: "Brief overview of the article.",
      date: new Date().toISOString().split("T")[0],
      tags: ["Design", "Engineering"],
      link: "",
      content: "",
      published: true,
    };
    const updated = [newItem, ...blogs];
    setBlogs(updated);
    saveBlogs(updated);
    showToast("Blog post created.");
  };

  const deleteBlog = (index) => {
    if (!window.confirm("Delete this blog post?")) return;
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    saveBlogs(updated);
    showToast("Blog post deleted.");
  };

  const saveBlogChanges = () => {
    saveBlogs(blogs);
    showToast("Blog posts saved successfully!");
  };

  /* ─── BACKUP & PASSKEY ─── */
  const handleExportBackup = () => {
    const jsonStr = exportFullBackup();
    const dataUri = `data:text/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `portfolio_cms_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("Full CMS backup exported!");
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const success = importFullBackup(reader.result);
      if (success) {
        setProjects(getProjects());
        setExperiences(getExperiences());
        setSkills(getSkills());
        setCertifications(getCertifications());
        setAbout(getAbout());
        setBlogs(getBlogs());
        showToast("Backup restored successfully!");
      } else {
        alert("Failed to parse backup JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handlePasskeyUpdate = async (e) => {
    e.preventDefault();
    if (!newPasskey || newPasskey.length < 6) {
      alert("Passkey must be at least 6 characters long.");
      return;
    }
    await updateAdminPasskey(newPasskey);
    setNewPasskey("");
    setPasskeySuccess("Admin passkey updated successfully.");
    setTimeout(() => setPasskeySuccess(""), 4000);
  };

  const handleLogoutAction = () => {
    logout();
    if (onLogout) onLogout();
  };

  /* Filtered Views */
  const filteredProjects = projects.filter((p) =>
    (p.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredExperiences = experiences.filter((e) =>
    (e.role || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.company || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBlogs = blogs.filter((b) =>
    (b.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <span className="admin-logo-badge">CMS</span>
            <span className="admin-logo-text">Portfolio Admin</span>
          </div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeNav === "overview" ? "active" : ""}`}
            onClick={() => { setActiveNav("overview"); setSidebarOpen(false); }}
          >
            <i className="ri-dashboard-line"></i> Overview
          </button>
          <button
            className={`admin-nav-item ${activeNav === "projects" ? "active" : ""}`}
            onClick={() => { setActiveNav("projects"); setSidebarOpen(false); }}
          >
            <i className="ri-folder-line"></i> Projects ({projects.length})
          </button>
          <button
            className={`admin-nav-item ${activeNav === "experience" ? "active" : ""}`}
            onClick={() => { setActiveNav("experience"); setSidebarOpen(false); }}
          >
            <i className="ri-briefcase-line"></i> Experience ({experiences.length})
          </button>
          <button
            className={`admin-nav-item ${activeNav === "skills" ? "active" : ""}`}
            onClick={() => { setActiveNav("skills"); setSidebarOpen(false); }}
          >
            <i className="ri-tools-line"></i> Skills & Tech ({skills.length})
          </button>
          <button
            className={`admin-nav-item ${activeNav === "about" ? "active" : ""}`}
            onClick={() => { setActiveNav("about"); setSidebarOpen(false); }}
          >
            <i className="ri-user-line"></i> About & Bio
          </button>
          <button
            className={`admin-nav-item ${activeNav === "certifications" ? "active" : ""}`}
            onClick={() => { setActiveNav("certifications"); setSidebarOpen(false); }}
          >
            <i className="ri-award-line"></i> Certifications ({certifications.length})
          </button>
          <button
            className={`admin-nav-item ${activeNav === "blogs" ? "active" : ""}`}
            onClick={() => { setActiveNav("blogs"); setSidebarOpen(false); }}
          >
            <i className="ri-article-line"></i> Blog Posts ({blogs.length})
          </button>
          <button
            className={`admin-nav-item ${activeNav === "settings" ? "active" : ""}`}
            onClick={() => { setActiveNav("settings"); setSidebarOpen(false); }}
          >
            <i className="ri-settings-4-line"></i> Settings & Backup
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-view-site-btn">
            <i className="ri-external-link-line"></i> View Live Site
          </Link>
          <button className="admin-logout-btn" onClick={handleLogoutAction}>
            <i className="ri-logout-box-line"></i> Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="ri-menu-line"></i>
            </button>
            <h1 className="admin-topbar-title">
              {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} Management
            </h1>
          </div>

          <div className="admin-topbar-actions">
            <Link to="/" className="admin-btn-secondary" style={{ textDecoration: "none" }}>
              Public Portfolio →
            </Link>
          </div>
        </header>

        <div className="admin-content">
          {/* 1. OVERVIEW DASHBOARD */}
          {activeNav === "overview" && (
            <div>
              <div className="admin-stats-grid">
                <div className="admin-stat-card">
                  <span className="admin-stat-label">Projects</span>
                  <span className="admin-stat-value">{projects.length}</span>
                  <span className="admin-stat-sub">
                    {projects.filter((p) => p.published !== false).length} published live
                  </span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">Experience</span>
                  <span className="admin-stat-value">{experiences.length}</span>
                  <span className="admin-stat-sub">Professional roles</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">Skill Groups</span>
                  <span className="admin-stat-value">{skills.length}</span>
                  <span className="admin-stat-sub">Categories managed</span>
                </div>
                <div className="admin-stat-card">
                  <span className="admin-stat-label">Articles</span>
                  <span className="admin-stat-value">{blogs.length}</span>
                  <span className="admin-stat-sub">Case studies & posts</span>
                </div>
              </div>

              <div className="admin-item-card">
                <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Welcome to your Portfolio CMS</h3>
                <p style={{ color: "#9E9D97", lineHeight: "1.6", fontSize: "0.92rem", marginBottom: "20px" }}>
                  All updates made in this panel instantly reflect on your live portfolio without editing any code.
                  You can manage projects, work experience, technical skills, about information, and export full JSON backups at any time.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button className="admin-btn-primary" onClick={() => setActiveNav("projects")}>
                    Manage Projects
                  </button>
                  <button className="admin-btn-secondary" onClick={() => setActiveNav("experience")}>
                    Manage Experience
                  </button>
                  <button className="admin-btn-secondary" onClick={handleExportBackup}>
                    Export Backup JSON
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECTS MANAGEMENT */}
          {activeNav === "projects" && (
            <div>
              <div className="admin-toolbar">
                <div className="admin-search-box">
                  <i className="ri-search-line"></i>
                  <input
                    type="text"
                    className="admin-search-input"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="admin-btn-primary" onClick={addProject}>
                    + Add New Project
                  </button>
                  <button className="admin-btn-secondary" onClick={saveProjectsChanges}>
                    Save All Changes
                  </button>
                </div>
              </div>

              <div className="admin-card-list">
                {filteredProjects.map((proj, idx) => (
                  <div key={proj.id || idx} className="admin-item-card">
                    <div className="admin-item-header">
                      <div className="admin-item-title-wrap">
                        <span className="admin-item-num">#{idx + 1}</span>
                        <span className="admin-item-title">{proj.title || "Untitled Project"}</span>
                        <span className={`admin-status-badge ${proj.published !== false ? "published" : "draft"}`}>
                          {proj.published !== false ? "Published" : "Draft"}
                        </span>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          className="admin-action-btn"
                          title="Move Up"
                          onClick={() => moveItem(projects, setProjects, saveProjects, idx, -1)}
                        >
                          <i className="ri-arrow-up-line"></i>
                        </button>
                        <button
                          className="admin-action-btn"
                          title="Move Down"
                          onClick={() => moveItem(projects, setProjects, saveProjects, idx, 1)}
                        >
                          <i className="ri-arrow-down-line"></i>
                        </button>
                        <button
                          className="admin-action-btn delete"
                          title="Delete Project"
                          onClick={() => deleteProject(idx)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.title || ""}
                          onChange={(e) => handleProjectField(idx, "title", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Category Label (e.g. FRONTEND • UI/UX)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.categoryLabel || ""}
                          onChange={(e) => handleProjectField(idx, "categoryLabel", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Filter Categories (comma separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.categories ? proj.categories.join(", ") : ""}
                          onChange={(e) => handleProjectArray(idx, "categories", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Cover Image / Path</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.image || ""}
                          onChange={(e) => handleProjectField(idx, "image", e.target.value)}
                        />
                        <div className="admin-image-preview-row">
                          {proj.image && (
                            <img src={proj.image} alt="Preview" className="admin-thumb-preview" />
                          )}
                          <label className="admin-file-upload-btn">
                            Upload Image File
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={(e) =>
                                handleFileUpload(e, (dataUrl) =>
                                  handleProjectField(idx, "image", dataUrl)
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div className="admin-form-group">
                        <label>Live Demo / Case Study Link</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.link || ""}
                          onChange={(e) => handleProjectField(idx, "link", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>GitHub Repository URL</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.github || ""}
                          onChange={(e) => handleProjectField(idx, "github", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label>Tech Stack Pills (comma separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={proj.techStack ? proj.techStack.join(", ") : ""}
                          onChange={(e) => handleProjectArray(idx, "techStack", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label>Short Description</label>
                        <textarea
                          className="admin-textarea"
                          value={proj.desc || ""}
                          onChange={(e) => handleProjectField(idx, "desc", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>The Problem (Case Study)</label>
                        <textarea
                          className="admin-textarea"
                          value={proj.problem || ""}
                          onChange={(e) => handleProjectField(idx, "problem", e.target.value)}
                          placeholder="Challenge or problem statement..."
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Process & Decisions</label>
                        <textarea
                          className="admin-textarea"
                          value={proj.designDecisions || ""}
                          onChange={(e) => handleProjectField(idx, "designDecisions", e.target.value)}
                          placeholder="Key design & architectural decisions..."
                        />
                      </div>

                      <div className="admin-form-group full-width" style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
                        <label className="admin-toggle-label">
                          <input
                            type="checkbox"
                            checked={proj.published !== false}
                            onChange={(e) => handleProjectField(idx, "published", e.target.checked)}
                          />
                          Published on Portfolio
                        </label>
                        <label className="admin-toggle-label">
                          <input
                            type="checkbox"
                            checked={proj.featured !== false}
                            onChange={(e) => handleProjectField(idx, "featured", e.target.checked)}
                          />
                          Featured Project
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. EXPERIENCE MANAGEMENT */}
          {activeNav === "experience" && (
            <div>
              <div className="admin-toolbar">
                <div className="admin-search-box">
                  <i className="ri-search-line"></i>
                  <input
                    type="text"
                    className="admin-search-input"
                    placeholder="Search roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="admin-btn-primary" onClick={addExperience}>
                    + Add Experience Entry
                  </button>
                  <button className="admin-btn-secondary" onClick={saveExperienceChanges}>
                    Save All Changes
                  </button>
                </div>
              </div>

              <div className="admin-card-list">
                {filteredExperiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="admin-item-card">
                    <div className="admin-item-header">
                      <div className="admin-item-title-wrap">
                        <span className="admin-item-num">#{idx + 1}</span>
                        <span className="admin-item-title">{exp.role} @ {exp.company}</span>
                        <span className={`admin-status-badge ${exp.published !== false ? "published" : "draft"}`}>
                          {exp.published !== false ? "Published" : "Draft"}
                        </span>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          className="admin-action-btn"
                          title="Move Up"
                          onClick={() => moveItem(experiences, setExperiences, saveExperiences, idx, -1)}
                        >
                          <i className="ri-arrow-up-line"></i>
                        </button>
                        <button
                          className="admin-action-btn"
                          title="Move Down"
                          onClick={() => moveItem(experiences, setExperiences, saveExperiences, idx, 1)}
                        >
                          <i className="ri-arrow-down-line"></i>
                        </button>
                        <button
                          className="admin-action-btn delete"
                          title="Delete Experience"
                          onClick={() => deleteExperience(idx)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Role / Job Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={exp.role || ""}
                          onChange={(e) => handleExpField(idx, "role", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Company / Organization</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={exp.company || ""}
                          onChange={(e) => handleExpField(idx, "company", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Duration (e.g. June 2026 - Present)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={exp.duration || ""}
                          onChange={(e) => handleExpField(idx, "duration", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Skills & Tools (comma separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={exp.skills ? exp.skills.join(", ") : ""}
                          onChange={(e) => handleExpSkills(idx, e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label>Description & Achievements</label>
                        <textarea
                          className="admin-textarea"
                          value={exp.desc || ""}
                          onChange={(e) => handleExpField(idx, "desc", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label className="admin-toggle-label">
                          <input
                            type="checkbox"
                            checked={exp.published !== false}
                            onChange={(e) => handleExpField(idx, "published", e.target.checked)}
                          />
                          Published on Portfolio
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SKILLS MANAGEMENT */}
          {activeNav === "skills" && (
            <div>
              <div className="admin-toolbar">
                <button className="admin-btn-primary" onClick={addSkillCategory}>
                  + Add Skill Category
                </button>
                <button className="admin-btn-secondary" onClick={saveSkillsChanges}>
                  Save All Changes
                </button>
              </div>

              <div className="admin-card-list">
                {skills.map((skillGroup, idx) => (
                  <div key={skillGroup.id || idx} className="admin-item-card">
                    <div className="admin-item-header">
                      <div className="admin-item-title-wrap">
                        <span className="admin-item-num">#{idx + 1}</span>
                        <span className="admin-item-title">{skillGroup.title}</span>
                      </div>
                      <div className="admin-item-actions">
                        <button
                          className="admin-action-btn delete"
                          onClick={() => deleteSkillCategory(idx)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Category Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={skillGroup.title || ""}
                          onChange={(e) => handleSkillField(idx, "title", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>RemixIcon Class (e.g. ri-code-s-slash-line)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={skillGroup.icon || ""}
                          onChange={(e) => handleSkillField(idx, "icon", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label>Skills List (comma separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={skillGroup.skills ? skillGroup.skills.join(", ") : ""}
                          onChange={(e) => handleSkillItems(idx, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ABOUT MANAGEMENT */}
          {activeNav === "about" && (
            <div>
              <div className="admin-toolbar">
                <button className="admin-btn-secondary" onClick={() => setAbout(getAbout())}>
                  Discard
                </button>
                <button className="admin-btn-primary" onClick={saveAboutChanges}>
                  Save About Section
                </button>
              </div>

              <div className="admin-item-card">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Main Title Line</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={about.title || ""}
                      onChange={(e) => handleAboutField("title", e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Accent Title Line</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={about.titleAccent || ""}
                      onChange={(e) => handleAboutField("titleAccent", e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group full-width">
                    <label>Bio Paragraph 1</label>
                    <textarea
                      className="admin-textarea"
                      value={about.bio1 || ""}
                      onChange={(e) => handleAboutField("bio1", e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group full-width">
                    <label>Bio Paragraph 2</label>
                    <textarea
                      className="admin-textarea"
                      value={about.bio2 || ""}
                      onChange={(e) => handleAboutField("bio2", e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Current Focus</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={about.currentFocus || ""}
                      onChange={(e) => handleAboutField("currentFocus", e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Resume Link / File Path</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={about.resumeLink || ""}
                      onChange={(e) => handleAboutField("resumeLink", e.target.value)}
                    />
                  </div>
                </div>

                <h4 style={{ margin: "24px 0 12px", color: "#D7D7D7" }}>Capabilities & Focus Cards</h4>
                <div className="admin-form-grid">
                  {(about.capabilities || []).map((cap, cIdx) => (
                    <div key={cIdx} style={{ background: "#181713", padding: "16px", borderRadius: "8px", border: "1px solid rgba(215,215,215,0.08)" }}>
                      <div className="admin-form-group" style={{ marginBottom: "8px" }}>
                        <label>Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={cap.title || ""}
                          onChange={(e) => handleCapabilityField(cIdx, "title", e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Description</label>
                        <textarea
                          className="admin-textarea"
                          style={{ minHeight: "60px" }}
                          value={cap.desc || ""}
                          onChange={(e) => handleCapabilityField(cIdx, "desc", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. CERTIFICATIONS MANAGEMENT */}
          {activeNav === "certifications" && (
            <div>
              <div className="admin-toolbar">
                <button className="admin-btn-primary" onClick={addCertification}>
                  + Add Certification
                </button>
                <button className="admin-btn-secondary" onClick={saveCertificationsChanges}>
                  Save Changes
                </button>
              </div>

              <div className="admin-card-list">
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="admin-item-card">
                    <div className="admin-item-header">
                      <div className="admin-item-title-wrap">
                        <span className="admin-item-num">#{idx + 1}</span>
                        <span className="admin-item-title">{cert.name}</span>
                      </div>
                      <div className="admin-item-actions">
                        <button
                          className="admin-action-btn delete"
                          onClick={() => deleteCertification(idx)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Certificate Name</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={cert.name || ""}
                          onChange={(e) => handleCertField(idx, "name", e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Issuer</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={cert.issuer || ""}
                          onChange={(e) => handleCertField(idx, "issuer", e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Date / Year</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={cert.date || ""}
                          onChange={(e) => handleCertField(idx, "date", e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Credential Link</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={cert.credentialUrl || ""}
                          onChange={(e) => handleCertField(idx, "credentialUrl", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. BLOGS / ARTICLES MANAGEMENT */}
          {activeNav === "blogs" && (
            <div>
              <div className="admin-toolbar">
                <div className="admin-search-box">
                  <i className="ri-search-line"></i>
                  <input
                    type="text"
                    className="admin-search-input"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="admin-btn-primary" onClick={addBlog}>
                    + Add Post
                  </button>
                  <button className="admin-btn-secondary" onClick={saveBlogChanges}>
                    Save All Changes
                  </button>
                </div>
              </div>

              <div className="admin-card-list">
                {filteredBlogs.map((blog, idx) => (
                  <div key={blog.id || idx} className="admin-item-card">
                    <div className="admin-item-header">
                      <div className="admin-item-title-wrap">
                        <span className="admin-item-num">#{idx + 1}</span>
                        <span className="admin-item-title">{blog.title}</span>
                      </div>
                      <div className="admin-item-actions">
                        <button
                          className="admin-action-btn delete"
                          onClick={() => deleteBlog(idx)}
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>

                    <div className="admin-form-grid">
                      <div className="admin-form-group full-width">
                        <label>Article Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={blog.title || ""}
                          onChange={(e) => handleBlogField(idx, "title", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>Date</label>
                        <input
                          type="date"
                          className="admin-input"
                          value={blog.date || ""}
                          onChange={(e) => handleBlogField(idx, "date", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label>External Link (Medium, Substack, etc.)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={blog.link || ""}
                          onChange={(e) => handleBlogField(idx, "link", e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label>Tags (comma separated)</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={blog.tags ? blog.tags.join(", ") : ""}
                          onChange={(e) => handleBlogTags(idx, e.target.value)}
                        />
                      </div>

                      <div className="admin-form-group full-width">
                        <label>Summary</label>
                        <textarea
                          className="admin-textarea"
                          value={blog.summary || ""}
                          onChange={(e) => handleBlogField(idx, "summary", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. SETTINGS & BACKUP */}
          {activeNav === "settings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="admin-item-card">
                <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Admin Security Passkey</h3>
                <p style={{ color: "#9E9D97", fontSize: "0.88rem", marginBottom: "16px" }}>
                  Change the passkey required to access the <code>/admin</code> dashboard.
                </p>

                {passkeySuccess && (
                  <div style={{ color: "#75E095", marginBottom: "12px", fontSize: "0.88rem" }}>
                    ✓ {passkeySuccess}
                  </div>
                )}

                <form onSubmit={handlePasskeyUpdate} style={{ display: "flex", gap: "12px", maxWidth: "480px" }}>
                  <input
                    type="password"
                    className="admin-input"
                    placeholder="Enter new admin passkey..."
                    value={newPasskey}
                    onChange={(e) => setNewPasskey(e.target.value)}
                  />
                  <button type="submit" className="admin-btn-primary">
                    Update Passkey
                  </button>
                </form>
              </div>

              <div className="admin-item-card">
                <h3 style={{ fontSize: "1.1rem", marginBottom: "6px" }}>Data Backup & Restore</h3>
                <p style={{ color: "#9E9D97", fontSize: "0.88rem", marginBottom: "16px" }}>
                  Export all CMS content into a portable JSON backup file or restore from an existing file.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button className="admin-btn-secondary" onClick={handleExportBackup}>
                    <i className="ri-download-line"></i> Export Full Backup JSON
                  </button>

                  <label className="admin-btn-secondary" style={{ cursor: "pointer" }}>
                    <i className="ri-upload-line"></i> Import Backup File
                    <input
                      type="file"
                      accept=".json"
                      style={{ display: "none" }}
                      onChange={handleImportBackup}
                    />
                  </label>

                  <button
                    className="admin-action-btn delete"
                    style={{ width: "auto", padding: "8px 16px", borderRadius: "8px" }}
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reset all CMS content to original defaults?")) {
                        resetProjects();
                        resetExperiences();
                        resetSkills();
                        resetCertifications();
                        resetAbout();
                        resetBlogs();
                        setProjects(getProjects());
                        setExperiences(getExperiences());
                        setSkills(getSkills());
                        setCertifications(getCertifications());
                        setAbout(getAbout());
                        setBlogs(getBlogs());
                        showToast("All entities reset to default seed data.");
                      }
                    }}
                  >
                    Reset All to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="admin-toast">
          <i className="ri-checkbox-circle-fill"></i>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
