import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";
import Logo from "../assets/logo.svg";
import NotificationsPopup from "./NotificationsPopup";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // ✅ user state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // ✅ Auth check + Sync user
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);

      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    // ✅ listen for custom events (auth/profile updates)
    const handleAuthChange = () => loadUser();
    window.addEventListener("authChange", handleAuthChange);

    // ✅ listen for localStorage changes (other tabs/updates)
    const handleStorage = (e) => {
      if (e.key === "user" || e.key === "authToken") {
        loadUser();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("authChange")); // trigger refresh
    navigate("/login");
  };

  // ✅ Nav links for logged in users
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Organizations", path: "/organizations" },
    { name: "Missions", path: "/missions" },
  ];

  return (
    <header className="bg-white w-full shadow-sm relative z-10">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-6 py-4">
        {/* ✅ Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-32" />
        </Link>

        {/* ✅ Search bar (only when logged in) */}
        {isLoggedIn && (
          <div className="relative flex-1 max-w-md ml-10 hidden md:block">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full rounded-full pl-4 pr-10 py-2 border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#0166FF] outline-none"
            />
            <Search className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        )}

        {/* ✅ Right Side */}
        <div className="flex items-center gap-6">
          {/* ----------- Guest (Not Logged In) ----------- */}
          {!isLoggedIn && (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className={`px-6 py-2 rounded-full font-medium transition ${
                  location.pathname === "/login"
                    ? "bg-[#0166FF] text-white border border-[#0166FF]"
                    : "bg-white text-[#0166FF] border border-[#0166FF] hover:bg-[#0166FF] hover:text-white"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-6 py-2 rounded-full font-medium transition ${
                  location.pathname === "/signup"
                    ? "bg-[#0166FF] text-white border border-[#0166FF]"
                    : "bg-white text-[#0166FF] border border-[#0166FF] hover:bg-[#0166FF] hover:text-white"
                }`}
              >
                Register
              </Link>
            </div>
          )}

          {/* ----------- Logged In Version ----------- */}
          {isLoggedIn && (
            <>
              {/* ✅ Nav Links */}
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium hover:text-[#0166FF] ${
                    location.pathname === item.path
                      ? "text-[#0166FF]"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* ✅ Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  className="relative p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="w-6 h-6 text-gray-700" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {notificationsOpen && (
                  <NotificationsPopup
                    onClose={() => setNotificationsOpen(false)}
                  />
                )}
              </div>

              {/* ✅ Profile Dropdown */}
              <div
                className="relative flex items-center gap-2 cursor-pointer"
                ref={dropdownRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#0166FF]"
                />
                <span className="font-medium text-gray-700">
                  {user?.name || "User"}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/editprofile"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
