// src/admin/AdminPage.jsx

import { useState, useEffect } from "react";
import AdminAuth from "./AdminAuth";
import AdminDashboard from "./AdminDashboard";
import { isAuthenticated } from "../cms/cmsStore";

const AdminPage = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  if (!authed) {
    return <AdminAuth onAuthenticated={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
};

export default AdminPage;
