import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage"; // ✅ added
import bgImage from "./assets/bg.svg";
import Home from "./pages/Home";
import OrganizationProfile from "./pages/OrganizationProfile";
import CreateMission from "./pages/CreateMission";
import { PrivateRoute, PublicRoute } from "./components/RouteGuard";

export default function App() {
  const location = useLocation();

  // ✅ Footer sirf login/signup pe hide hoga
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Header hamesha dikhai dega */}
      <Header />

      {/* ✅ Background wrapper */}
      <div
        className="flex-grow"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />


          {/* ✅ Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/organizations"
            element={
              <PrivateRoute>
                <OrganizationProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/missions"
            element={
              <PrivateRoute>
                <CreateMission />
              </PrivateRoute>
            }
          />


          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editprofile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

     

      {/* ✅ Footer sirf login/signup pe hide hoga */}
      {!isAuthPage && <Footer />}
    </div>
    

  );
}
