import { useState } from "react";
import { Newspaper, CheckCircle2, Clock } from "lucide-react";
import CompletedActs from "./CompletedActs";
import PendingActs from "./PendingActs";
import PostCard from "./PostCard";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("Feed");

  const tabs = [
    { label: "Feed", icon: <Newspaper className="w-4 h-4" /> },
    { label: "Completed Acts", icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: "Pending Acts", icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="px-6 pt-4 pb-6 bg-white">
      {/* Bio text (only for non-Feed tabs) */}
      {activeTab !== "Feed" && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <p className="text-gray-700 leading-relaxed">
            Software engineer by trade, aspiring chef by night.
            I'm on a mission to find the perfect ramen recipe.
            When I'm not coding or cooking, I'm probably lost in a good
            sci-fi novel or planning my next trip.
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-3 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center justify-center gap-2 h-[47px] w-[340px] rounded-full text-sm font-medium transition-all duration-200
              ${
                activeTab === tab.label
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "Feed" && (
          <div className="space-y-6">
            <PostCard
              org="The Joshua Organization"
              initials="JO"
              color="bg-blue-500"
              image="https://images.pexels.com/photos/3184406/pexels-photo-3184406.jpeg"
              title="Friendly Visits & Companionship"
              desc="Spend time talking, listening, or playing board games/cards."
            />
            <PostCard
              org="Evergreen Consulting Group"
              initials="EC"
              color="bg-purple-500"
              image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
              title="Reading Aloud"
              desc="Read newspapers, books, or letters to residents with vision issues."
            />
          </div>
        )}

        {activeTab === "Completed Acts" && <CompletedActs />}
        {activeTab === "Pending Acts" && <PendingActs />}
      </div>
    </div>
  );
}
