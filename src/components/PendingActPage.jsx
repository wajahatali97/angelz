import React, { useState, useEffect, useRef } from "react";
import { MapPin, ChevronLeft, CalendarDays, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PendingActPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white flex flex-col h-full relative">
      {/* ---------- Top Banner ---------- */}
      <div className="mt-10 relative">
        <img
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
          alt="banner"
          className="w-full h-52 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/30 rounded-lg" />

        {/* Back Arrow */}
        <button
          onClick={() => navigate("/profile")}
          className="absolute top-3 left-3"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* 3 Dots Menu */}
        <div className="absolute top-3 right-3" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            …
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg text-sm">
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                Report
              </button>
              <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                Bug
              </button>
            </div>
          )}
        </div>

        {/* Org Title + Time */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-between px-4 text-white">
          <div>
            <h2 className="text-lg font-semibold">The Joshua Organization</h2>
            <p className="text-sm opacity-90">@stanch</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span>5:30 PM</span>
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>Monday</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Content ---------- */}
      <div className="px-6 pb-10">
        {/* Location + Points + Pending + Opt-out */}
        <div className="flex items-center justify-between mb-8 mt-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              Waterloo Toronto
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-800">
                <strong>150</strong> Points Earned
              </span>
              <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-100 transition">
                Pending
              </button>
            </div>
          </div>

          {/* ✅ Opt-out Button */}
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs font-medium shadow hover:bg-blue-700 transition"
          >
            Opt-out
          </button>
        </div>

        {/* ---------- Images + Info ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Images */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <img
                src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"
                alt="activity"
                className="rounded-lg object-cover w-full h-32"
              />
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="activity"
                className="rounded-lg object-cover w-full h-32"
              />
            </div>
            <div className="col-span-2">
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
                alt="activity"
                className="rounded-lg object-cover w-full h-40"
              />
            </div>
          </div>

          {/* Right Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Mission Information:
              </h3>
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p>
                  <strong>Mission Date:</strong> 02-Aug-2025
                </p>
                <p>
                  <strong>Mission Timing:</strong> 06:00 PM
                </p>
                <p>
                  <strong>Mission Type:</strong> Virtual
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Organization Description
              </h3>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                Our Sector B initiative focuses on empowering local communities
                throughout the Waterloo–Toronto area by providing access to
                clean water, sustainable agriculture projects, and educational
                resources. We partner directly with community leaders to
                implement long-term solutions that foster self-sufficiency and
                create lasting change.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal (Request Processed) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Emoji */}
            <div className="text-5xl mb-4">😊</div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your request has been processed.
            </h2>
            <p className="text-gray-600 text-sm">
              You will be notified shortly whether it has been accepted or
              rejected.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
