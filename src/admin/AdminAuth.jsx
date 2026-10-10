// src/admin/AdminAuth.jsx

import { useState } from "react";
import { verifyPasskey } from "../cms/cmsStore";
import { Link } from "react-router-dom";
import "../styles/admin.css";

const AdminAuth = ({ onAuthenticated }) => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError("Please enter your admin passkey.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const isValid = await verifyPasskey(passkey.trim());
      if (isValid) {
        onAuthenticated();
      } else {
        setError("Invalid passkey. Access denied.");
      }
    } catch (err) {
      setError("Authentication error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <div className="admin-auth-icon">
          <i className="ri-shield-keyhole-line"></i>
        </div>

        <h1>CMS Authentication</h1>
        <p>Enter your private administrator passkey to access the portfolio content management system.</p>

        {error && <div className="admin-auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <input
            type="password"
            className="admin-auth-input"
            placeholder="Enter admin passkey..."
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            autoFocus
          />

          <button type="submit" className="admin-auth-btn" disabled={loading}>
            {loading ? "Verifying..." : "Unlock Dashboard"}
          </button>
        </form>

        <Link to="/" className="admin-back-link">
          ← Return to Public Portfolio
        </Link>
      </div>
    </div>
  );
};

export default AdminAuth;
