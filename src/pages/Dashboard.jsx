import React, { useEffect, useState } from "react";
import {
  Bell,
  Search,
  Clock,
  CheckCircle,
  Hourglass,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Dummy chart data
  const activityData = [
    { name: "Mon", hours: 2, tasks: 3 },
    { name: "Tue", hours: 5, tasks: 2 },
    { name: "Wed", hours: 3, tasks: 4 },
    { name: "Thu", hours: 6, tasks: 1 },
    { name: "Fri", hours: 4, tasks: 5 },
    { name: "Sat", hours: 7, tasks: 3 },
    { name: "Sun", hours: 2, tasks: 2 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user ? user.firstName : "Guest"} 👋
        </h1>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          {/* Notifications */}
          <button className="relative bg-white p-2 rounded-full shadow hover:bg-gray-50">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>

          {/* Profile Pic */}
          {user?.profilePic && (
            <img
              src={
                typeof user.profilePic === "string"
                  ? user.profilePic
                  : URL.createObjectURL(user.profilePic)
              }
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <Clock className="w-10 h-10 text-blue-600" />
          <div>
            <h3 className="text-gray-600">Total Hours</h3>
            <p className="text-2xl font-bold text-blue-600">48</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <CheckCircle className="w-10 h-10 text-green-600" />
          <div>
            <h3 className="text-gray-600">Completed</h3>
            <p className="text-2xl font-bold text-green-600">12</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <Hourglass className="w-10 h-10 text-yellow-600" />
          <div>
            <h3 className="text-gray-600">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">5</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transition">
          <Award className="w-10 h-10 text-purple-600" />
          <div>
            <h3 className="text-gray-600">Achievements</h3>
            <p className="text-2xl font-bold text-purple-600">3</p>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity + Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Weekly Activity 📊
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" name="Hours Worked" />
              <Bar dataKey="tasks" fill="#10b981" name="Tasks Completed" />
            </BarChart>
          </ResponsiveContainer>

          {/* Timeline Activities */}
          <h3 className="text-lg font-semibold mt-6 mb-3">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-green-500">✅</span>
              <p>
                Updated Profile{" "}
                <span className="text-gray-400 text-sm">2h ago</span>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500">🎉</span>
              <p>
                Joined Volunteering Event{" "}
                <span className="text-gray-400 text-sm">1d ago</span>
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-500">📌</span>
              <p>
                Added New Skills{" "}
                <span className="text-gray-400 text-sm">3d ago</span>
              </p>
            </li>
          </ul>
        </div>

        {/* Profile Quick View */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          {user?.profilePic ? (
            <img
              src={
                typeof user.profilePic === "string"
                  ? user.profilePic
                  : URL.createObjectURL(user.profilePic)
              }
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No Pic</span>
            </div>
          )}
          <h3 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-gray-500 text-sm">{user?.email}</p>
          <a
            href="/editprofile"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </a>
        </div>
      </div>

      {/* Upcoming Missions */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Upcoming Missions 🚀
        </h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>Community Clean-up Drive</span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
              Tomorrow
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span>Blood Donation Camp</span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
              In 3 days
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span>Tree Plantation</span>
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
              Next Week
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
