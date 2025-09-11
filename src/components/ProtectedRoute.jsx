import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token"); // agar token mila to login samjho

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // login par bhej do
  }

  return children; // agar login hai to page dikhao
}
