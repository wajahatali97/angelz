import React from "react";
import { ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.svg"; // same background jo har page me use ho raha he
import blueCrown from "../assets/blue-crown.png"; // 👑 crown image (tum apna Figma wala PNG yahan rakh dena)
import diamondIcon from "../assets/diamond-icon.png";


export default function LeaderBoardPage() {
  const navigate = useNavigate();

  const leaders = [
    // { id: 1, name: "Bryan Wolf", points: 43, image: "https://i.pravatar.cc/100?img=1", rank: 1 },
    { id: 2, name: "Armin", points: 40, image: "https://i.pravatar.cc/100?img=2", rank: 2 },
    { id: 3, name: "Alex Turner", points: 38, image: "https://i.pravatar.cc/100?img=3", rank: 3 },
    { id: 4, name: "Marsha Fisher", image: "https://i.pravatar.cc/100?img=4", rankText: "4th", trend: "down" },
    { id: 5, name: "Juanita Cormier", image: "https://i.pravatar.cc/100?img=5", rankText: "5th", trend: "up" },
    { id: 6, name: "You", image: "https://i.pravatar.cc/100?img=6", rankText: "6th", trend: "down" },
    { id: 7, name: "Tamara Schmidt", image: "https://i.pravatar.cc/100?img=7", rankText: "7th", trend: "up" },
    { id: 8, name: "Ricardo Veum", image: "https://i.pravatar.cc/100?img=8", rankText: "8th", trend: "up" },
    { id: 9, name: "Gary Sanford", image: "https://i.pravatar.cc/100?img=9", rankText: "9th", trend: "down" },
    { id: 10, name: "Becky Bartell", image: "https://i.pravatar.cc/100?img=10", rankText: "10th", trend: "up" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center py-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Header */}
      <div className="flex items-center w-full max-w-sm px-4 mb-4 z-20">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="flex-1 text-center text-lg font-semibold">Leader Board</h2>
      </div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm p-6 overflow-hidden">
            {/* Crown - visible and centered */}
            <img
              src={blueCrown}
              alt="crown"
              className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-10 z-30 pointer-events-none"
            />

            {/* Top 3 */}
            <div className="flex justify-center items-end gap-6 mb-8 mt-12">

          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={leaders[1].image}
                alt={leaders[1].name}
                className="w-16 h-16 rounded-full border-2 border-blue-400 object-cover"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                2
              </span>
            </div>
            <p className="text-sm font-semibold mt-2">{leaders[1].name}</p>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <img src={diamondIcon} alt="" className="w-3 h-3" />
              <span>{leaders[1].points} pts</span>
            </div>
          </div>

          {/* 1st */}
          <div className="flex flex-col items-center -mt-6 relative z-20">
            <div className="relative">
              <img
                src={leaders[0].image}
                alt={leaders[0].name}
                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
              />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                1
              </span>
            </div>
            <p className="text-sm font-semibold mt-2">{leaders[0].name}</p>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <img src={diamondIcon} alt="" className="w-3 h-3" />
              <span>{leaders[0].points} pts</span>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={leaders[2].image}
                alt={leaders[2].name}
                className="w-16 h-16 rounded-full border-2 border-blue-400 object-cover"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                3
              </span>
            </div>
            <p className="text-sm font-semibold mt-2">{leaders[2].name}</p>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <img src={diamondIcon} alt="" className="w-3 h-3" />
              <span>{leaders[2].points} pts</span>
            </div>
          </div>
        </div>

        {/* Rest of list */}
        <ul className="space-y-2">
          {leaders.slice(3).map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-gray-700 font-semibold">{user.rankText.replace("th", "")}</span>
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span className="text-gray-800 font-medium">{user.name}</span>
              </div>
              <div className="flex items-center gap-1">
                {user.trend === "up" ? (
                  <ArrowUp size={12} className="text-green-500" />
                ) : (
                  <ArrowDown size={12} className="text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    user.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.rankText}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
