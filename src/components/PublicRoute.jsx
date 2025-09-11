import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />; // agar already login hai to dashboard bhej do
  }

  return children; // warna normal public page dikhao (login ya signup)
}
