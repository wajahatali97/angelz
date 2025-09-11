import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function NotificationsPopup({ onClose }) {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        // Convert API response to notification format
        const formatted = data.slice(0, 5).map((user, index) => ({
          id: user.id,
          name: user.name,
          message: "requested you for this job",
          job: "Supporting a Lonely Person (One-on-One)",
          time: `${index + 1} weeks ago`,
          avatar: `https://i.pravatar.cc/150?img=${index + 5}`,
          unread: index % 2 === 0, // alternate unread
        }));

        setNotifications(formatted);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.unread);

  return (
    <div className="absolute right-0 mt-4 w-[28rem]">
      <div className="bg-white shadow-2xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              filter === "unread"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Unread
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              No notifications
            </p>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between p-3 border-b last:border-b-0"
              >
                {/* Avatar + Content */}
                <div className="flex gap-4">
                  <img
                    src={n.avatar}
                    alt={n.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {n.name}{" "}
                      <span className="font-normal text-gray-600">
                        {n.message}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      {n.job}
                    </p>
                    <p className="text-xs text-red-500 mt-1">{n.time}</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 text-sm">
                    Accept
                  </button>
                  <button className="px-3 py-1 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50 text-sm">
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
