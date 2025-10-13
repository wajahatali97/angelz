import React from "react";
import { MapPin, Star } from "lucide-react";

// 🔹 Images
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import bronzeMedal from "../assets/medal-bronze.png";

export default function CreateMissionPage() {
  const volunteers = [
    { id: 1, name: "John Doe", location: "New York", points: 200, image: profile1 },
    { id: 2, name: "Sarah Smith", location: "California", points: 180, image: profile2 },
    { id: 3, name: "Michael Lee", location: "Texas", points: 220, image: profile3 },
    { id: 4, name: "Emma Wilson", location: "Florida", points: 190, image: profile1 },
    { id: 5, name: "Chris Evans", location: "Nevada", points: 210, image: profile2 },
    { id: 6, name: "David Brown", location: "Chicago", points: 200, image: profile3 },
  ];

  const leaderboard = [
    { id: 1, name: "Armin", handle: "@armin", rank: "1st", up: true, img: profile1 },
    { id: 2, name: "John", handle: "@john12", rank: "2nd", up: true, img: profile2 },
    { id: 3, name: "Maik", handle: "@mr13", rank: "3rd", up: false, img: profile3 },
    { id: 4, name: "Hanaya", handle: "@hana21", rank: "4th", up: false, img: profile1 },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 p-10 justify-center bg-transparent">
      {/* 🔸 LEFT: Volunteer Cards */}
      <div
        className="flex justify-center items-center bg-transparent"
        style={{ width: "610px", height: "1218px" }}
      >
        <div className="grid grid-cols-2 gap-8">
          {volunteers.map((vol) => (
            <div
              key={vol.id}
              className="relative rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
              style={{ width: "290px", height: "386px" }}
            >
              {/* 🖼️ Image */}
              <img
                src={vol.image}
                alt={vol.name}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* 🥉 Medal + Points */}
              <div className="absolute bottom-20 right-3 flex flex-col items-center text-white">
                <img
                  src={bronzeMedal}
                  alt="medal"
                  className="w-8 h-8 mb-1 drop-shadow-md"
                />
                <div className="flex items-center gap-1 text-sm font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{vol.points} pts</span>
                </div>
              </div>

              {/* 👤 Name + Location (same line as medal) */}
              <div className="absolute bottom-20 left-4 text-white">
                <h3 className="font-semibold text-base leading-tight">
                  {vol.name}
                </h3>
                <div className="flex items-center text-xs opacity-90 mt-0.5">
                  <MapPin className="w-3 h-3 mr-1" />
                  {vol.location}
                </div>
              </div>

              {/* ⚡ Zap Button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                  className="bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all"
                  style={{ width: "261px", height: "40px" }}
                >
                  Zap!
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔸 RIGHT: Leaderboard Section */}
      <div className="w-full md:w-72 bg-white rounded-2xl shadow-md p-6 h-fit mt-10 mb-10">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Leader Board</h3>
        <div className="space-y-4">
          {leaderboard.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.handle}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-800">{item.rank}</span>
                {item.up ? (
                  <span className="text-green-500 text-xs">▲</span>
                ) : (
                  <span className="text-red-500 text-xs">▼</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button 
        
        className="mt-6 w-full bg-blue-600 text-white font-medium py-2 rounded-full hover:bg-blue-700 transition">
          View All
        </button>
      </div>
    </div>
  );
}
