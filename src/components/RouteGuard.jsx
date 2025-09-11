import React from "react";
import { Navigate } from "react-router-dom";
 
export function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("authToken"); // ya context state
 
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
 
export function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("authToken");
 
  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
}
 
 