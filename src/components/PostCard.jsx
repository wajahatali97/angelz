import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Heart, MessageCircle, Share } from "lucide-react"; 
import CalendarIcon from "../assets/calendericon.png"; // Figma calendar icon

function PostCard({ org, initials, color, image, title, desc }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 flex items-center justify-center ${color} text-white text-sm font-semibold rounded-full`}
          >
            {initials}
          </div>
          <span className="font-medium text-gray-900 text-sm">{org}</span>
        </div>

        {/* 3 Dots with Dropdown */}
        <div className="relative" ref={menuRef}>
          <MoreHorizontal
            className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Report
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Bug
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="px-4">
        <div className="rounded-xl overflow-hidden">
          <img
            src={image}
            alt="post"
            className="w-full h-72 md:h-80 lg:h-96 object-cover"
          />
        </div>
      </div>

      {/* Title & Description */}
      <div className="px-5 mt-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base text-gray-900">{title}</h3>
          <span className="text-sm text-gray-600">Virtual</span>
        </div>
        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{desc}</p>
      </div>

      {/* Event Info */}
      <div className="flex justify-between items-center text-sm text-gray-600 px-5 mt-4">
        <div className="flex items-center gap-2">
          <img src={CalendarIcon} alt="calendar" className="w-4 h-4" />
          <span>12-02-2022 | 12:00 pm to 10:00 pm</span>
        </div>
        <span className="font-semibold text-gray-900 text-sm">
          Earned <span className="text-black">150 points</span>
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-5 my-4"></div>

      {/* Stats + Zap It */}
      <div className="flex justify-between items-center text-xs text-gray-500 px-5 mt-3">
        <div className="flex gap-4">
          <span>752 Likes</span>
          <span>3 comments</span>
          <span>50 shares</span>
        </div>
        <button className="text-blue-600 font-medium text-xs hover:underline">
          Zap It
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-5 my-4"></div>

      {/* Social Actions */}
      <div className="flex justify-around px-5 pb-4 text-sm font-medium text-gray-600">
        <button className="flex items-center gap-2 hover:text-red-500 transition">
          <Heart className="w-4 h-4" /> Like
        </button>
        <button className="flex items-center gap-2 hover:text-blue-500 transition">
          <MessageCircle className="w-4 h-4" /> Comment
        </button>
        <button className="flex items-center gap-2 hover:text-green-600 transition">
          <Share className="w-4 h-4" /> Share
        </button>
      </div>
    </div>
  );
}

export default PostCard;
