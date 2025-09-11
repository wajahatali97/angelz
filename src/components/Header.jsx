import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import Logo from "../assets/logo.svg";
import NotificationsPopup from "./NotificationsPopup"; // 👈 new import
import Button from "./ThemeButton";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // 👈 notification state
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // ✅ Check auth state
  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  // ✅ On mount + auth change listener
  useEffect(() => {
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Menus
  const guestMenu = [
  { name: "Log in", path: "/login" },
  { name: "Register", path: "/signup" }, // ✅ same path
];


  const loggedInMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Organizations", path: "/organizations" },
    { name: "Missions", path: "/missions" },
  ];

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <header className="bg-white w-full border-b-4 border-[#D9D9D9] relative z-10">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-40 sm:w-48 md:w-60" />
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-3 sm:gap-5">
          {!isLoggedIn ? (
            // ✅ Guest menu
            guestMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition ${
                  location.pathname === item.path ? "bg-blue-500 text-white" : ""
                }`}
              >
                {item.name}
              </Link>
            ))
          ) : (
            <>
              {/* Search */}
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              </div>

              {/* Logged In Menu */}
              {loggedInMenu.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition ${
                    location.pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Notification Icon */}
              <div className="relative" ref={notifRef}>
                <button
                  className="relative p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {notificationsOpen && (
                  <NotificationsPopup onClose={() => setNotificationsOpen(false)} />
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/editprofile"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => setDropdownOpen(false)}
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
