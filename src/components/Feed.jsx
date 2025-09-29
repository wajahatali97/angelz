import React from "react";
import { MoreHorizontal, Heart, MessageCircle, Share } from "lucide-react"; 
import CalendarIcon from "../assets/calendericon.png"; // Figma calendar icon

function PostCard({ org, initials, color, image, title, desc }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
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
        <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
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

export default function Feed() {
  const posts = [
    {
      org: "The Joshua Organization",
      initials: "JO",
      color: "bg-blue-500",
      image: "https://picsum.photos/600/400?random=1",
      title: "Friendly Visits & Companionship",
      desc: "Spend time talking, listening, or playing board games/cards.",
    },
    {
      org: "Evergreen Consulting Group",
      initials: "EC",
      color: "bg-purple-500",
      image: "https://picsum.photos/600/400?random=2",
      title: "Community Workshop",
      desc: "Helping young minds grow by organizing skill-based workshops and community sessions.",
    },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {posts.map((post, i) => (
        <PostCard key={i} {...post} />
      ))}
    </div>
  );
}
