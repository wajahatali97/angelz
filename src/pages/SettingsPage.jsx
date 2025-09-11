import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Load saved preferences from localStorage
  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode") === "true";
    const savedLang = localStorage.getItem("language") || "English";
    setDarkMode(savedDark);
    setLanguage(savedLang);

    if (savedDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // ✅ Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  // ✅ Save General Settings
  const handleSaveGeneral = () => {
    localStorage.setItem("language", language);
    localStorage.setItem("emailNotifications", emailNotifications);
    alert("General settings saved!");
  };

  // ✅ Update Password (API call)
  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 👇 yahan apna real API endpoint replace karo
      const res = await fetch("/api/users/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_TOKEN`, // JWT token lagana hoga
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("Failed to update password");

      alert("✅ Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating password");
    }
  };

  // ✅ Delete Account (API call)
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch("/api/users/user-profile/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer YOUR_TOKEN`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete account");

      alert("❌ Account deleted!");
      // localStorage.clear(); // agar user data clear karna ho
    } catch (err) {
      console.error(err);
      alert("Error deleting account");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Settings ⚙️
      </h1>

      {/* General Settings */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          General Settings
        </h2>

        <div className="space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-1 rounded-full text-sm ${
                darkMode
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? "On" : "Off"}
            </button>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Email Notifications
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 rounded"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>English</option>
              <option>Urdu</option>
              <option>Arabic</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveGeneral}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Account Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleUpdatePassword}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Update Password
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
