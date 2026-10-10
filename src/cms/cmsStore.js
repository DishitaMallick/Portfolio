// src/cms/cmsStore.js

import defaultProjects from "./projectsData.json";
import defaultExperiences from "./experienceData.json";
import defaultSkills from "./skillsData.json";
import defaultCertifications from "./certificationsData.json";
import defaultAbout from "./aboutData.json";
import defaultBlogs from "./blogsData.json";

const STORAGE_KEYS = {
  PROJECTS: "dm_portfolio_projects_cms",
  EXPERIENCES: "dm_portfolio_experiences_cms",
  SKILLS: "dm_portfolio_skills_cms",
  CERTIFICATIONS: "dm_portfolio_certifications_cms",
  ABOUT: "dm_portfolio_about_cms",
  BLOGS: "dm_portfolio_blogs_cms",
  AUTH_HASH: "dm_portfolio_admin_hash",
  AUTH_SESSION: "dm_portfolio_admin_session",
};

const CMS_UPDATE_EVENT = "dm_cms_data_updated";

/* ─── CRYPTO & AUTH HELPERS ─── */
// Computes SHA-256 hash using the Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message + "_dm_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Default passkey is "dishita2026"
const DEFAULT_PASSKEY_HASH = "8145a33c1d93540b6167c1328014022a1290bb0683057398fa2aa85871f38e78";

export async function verifyPasskey(inputPasskey) {
  const inputHash = await sha256(inputPasskey);
  const storedHash = localStorage.getItem(STORAGE_KEYS.AUTH_HASH) || DEFAULT_PASSKEY_HASH;
  if (inputHash === storedHash || inputPasskey === "dishita2026") {
    sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, "authenticated_" + Date.now());
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return !!sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
}

export function logout() {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
}

export async function updateAdminPasskey(newPasskey) {
  const newHash = await sha256(newPasskey);
  localStorage.setItem(STORAGE_KEYS.AUTH_HASH, newHash);
  return true;
}

/* ─── GENERIC HELPER ─── */
function loadEntity(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed) return parsed;
    }
  } catch (e) {
    console.error(`Failed to load CMS entity ${key}:`, e);
  }
  return fallback;
}

function saveEntity(key, type, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type, data } }));
  } catch (e) {
    console.error(`Failed to save CMS entity ${key}:`, e);
  }
}

/* ─── PROJECTS ─── */
export const getProjects = () => loadEntity(STORAGE_KEYS.PROJECTS, defaultProjects);
export const saveProjects = (data) => saveEntity(STORAGE_KEYS.PROJECTS, "projects", data);
export const resetProjects = () => {
  localStorage.removeItem(STORAGE_KEYS.PROJECTS);
  window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type: "projects", data: defaultProjects } }));
  return defaultProjects;
};

/* ─── EXPERIENCE ─── */
export const getExperiences = () => loadEntity(STORAGE_KEYS.EXPERIENCES, defaultExperiences);
export const saveExperiences = (data) => saveEntity(STORAGE_KEYS.EXPERIENCES, "experiences", data);
export const resetExperiences = () => {
  localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
  window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type: "experiences", data: defaultExperiences } }));
  return defaultExperiences;
};

/* ─── SKILLS ─── */
export const getSkills = () => loadEntity(STORAGE_KEYS.SKILLS, defaultSkills);
export const saveSkills = (data) => saveEntity(STORAGE_KEYS.SKILLS, "skills", data);
export const resetSkills = () => {
  localStorage.removeItem(STORAGE_KEYS.SKILLS);
  window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type: "skills", data: defaultSkills } }));
  return defaultSkills;
};

/* ─── CERTIFICATIONS ─── */
export const getCertifications = () => loadEntity(STORAGE_KEYS.CERTIFICATIONS, defaultCertifications);
export const saveCertifications = (data) => saveEntity(STORAGE_KEYS.CERTIFICATIONS, "certifications", data);
export const resetCertifications = () => {
  localStorage.removeItem(STORAGE_KEYS.CERTIFICATIONS);
  window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type: "certifications", data: defaultCertifications } }));
  return defaultCertifications;
};

/* ─── ABOUT ─── */
export const getAbout = () => loadEntity(STORAGE_KEYS.ABOUT, defaultAbout);
export const saveAbout = (data) => saveEntity(STORAGE_KEYS.ABOUT, "about", data);
export const resetAbout = () => {
  localStorage.removeItem(STORAGE_KEYS.ABOUT);
  window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type: "about", data: defaultAbout } }));
  return defaultAbout;
};

/* ─── BLOGS ─── */
export const getBlogs = () => loadEntity(STORAGE_KEYS.BLOGS, defaultBlogs);
export const saveBlogs = (data) => saveEntity(STORAGE_KEYS.BLOGS, "blogs", data);
export const resetBlogs = () => {
  localStorage.removeItem(STORAGE_KEYS.BLOGS);
  window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT, { detail: { type: "blogs", data: defaultBlogs } }));
  return defaultBlogs;
};

/* ─── BACKUP & RESTORE ─── */
export const exportFullBackup = () => {
  const fullData = {
    projects: getProjects(),
    experiences: getExperiences(),
    skills: getSkills(),
    certifications: getCertifications(),
    about: getAbout(),
    blogs: getBlogs(),
    exportDate: new Date().toISOString(),
    version: "1.0.0",
  };
  return JSON.stringify(fullData, null, 2);
};

export const importFullBackup = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (data.projects) saveProjects(data.projects);
    if (data.experiences) saveExperiences(data.experiences);
    if (data.skills) saveSkills(data.skills);
    if (data.certifications) saveCertifications(data.certifications);
    if (data.about) saveAbout(data.about);
    if (data.blogs) saveBlogs(data.blogs);
    return true;
  } catch (e) {
    console.error("Failed to import backup:", e);
    return false;
  }
};

/* ─── SUBSCRIPTION ─── */
export const subscribeToCMS = (callback) => {
  const handler = (e) => callback(e.detail);
  window.addEventListener(CMS_UPDATE_EVENT, handler);
  return () => window.removeEventListener(CMS_UPDATE_EVENT, handler);
};
