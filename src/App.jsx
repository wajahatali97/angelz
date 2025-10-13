import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import bgImage from "./assets/bg.svg";
import OrganizationProfile from "./pages/OrganizationProfile";
import CreateMission from "./pages/CreateMission";
import { PrivateRoute, PublicRoute } from "./components/RouteGuard";
import CreateMissionPage from "./pages/CreateMissionPage";


// ✅ Detail Pages
import CompletedActPage from "./components/CompletedActPage";
import PendingActPage from "./components/PendingActPage";
import ActDetailPage from "./pages/ActDetailPage";

// ✅ NEW: LeaderBoard Page
import LeaderBoardPage from "./pages/LeaderBoardPage";

export default function App() {
  const location = useLocation();

  // ✅ Footer sirf login/signup pages par hide hoga
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Header hamesha show hoga */}
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
          {/* ✅ Root route ko login page banaya */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* ✅ Public Routes */}
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

          {/* ✅ Detail Pages */}
          <Route
            path="/act/:id"
            element={
              <PrivateRoute>
                <ActDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/completed/:id"
            element={
              <PrivateRoute>
                <CompletedActPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/pending/:id"
            element={
              <PrivateRoute>
                <PendingActPage />
              </PrivateRoute>
            }
          />

          {/* ✅ NEW: LeaderBoard Route */}
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <LeaderBoardPage />
              </PrivateRoute>
            }
          />
          <Route 
          path="/create-mission" 
          element={
            <PrivateRoute>
          <CreateMissionPage />
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
