import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function NotificationsPopup({ onClose }) {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);

  // ✅ API se notifications fetch karo
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // 👇 yahan apna API endpoint lagana (sirf example ke liye JSONPlaceholder use kiya hai)
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        setNotifications(
          data.slice(0, 3).map((item, index) => ({
            id: index + 1,
            name: item.name,
            job: "Supporting a Lonely Person (One-on-One)",
            time: "7 weeks ago",
            avatar: `https://i.pravatar.cc/150?img=${index + 3}`,
            unread: index === 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // ✅ Filter notifications
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  // ✅ Accept / Decline Handlers
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`https://yourapi.com/missions/${id}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN", // agar JWT use kar rahe ho
        },
        body: JSON.stringify({ missionId: id }),
      });

      if (!res.ok) throw new Error("Failed to accept mission");

      console.log("✅ Mission accepted:", id);

      // notification ko update karo (read ya remove)
      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    } catch (error) {
      console.error("Error accepting mission:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const res = await fetch(`api/users/missions/${id}/decline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN",
        },
        body: JSON.stringify({ missionId: id }),
      });

      if (!res.ok) throw new Error("Failed to decline mission");

      console.log("❌ Mission declined:", id);

      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    } catch (error) {
      console.error("Error declining mission:", error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-[420px] bg-white rounded-2xl shadow-xl border p-6 z-50">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            activeTab === "all"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("unread")}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            activeTab === "unread"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Unread
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 max-h-[350px] overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">No notifications</p>
        ) : (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <img
                src={n.avatar}
                alt={n.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{n.name}</span> requested you
                  for this job
                  <br />
                  <span className="text-gray-600 font-medium">
                    {n.job}
                  </span>
                </p>
                <span className="text-xs text-red-500">{n.time}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(n.id)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(n.id)}
                  className="px-3 py-1 border border-blue-500 text-blue-500 text-sm rounded-lg hover:bg-blue-50"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
