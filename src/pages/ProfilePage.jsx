import React from "react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileInfo from "../components/ProfileInfo.jsx";
import ProfileTabs from "../components/ProfileTabs.jsx";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* top section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          <ProfileHeader />
          <ProfileInfo />
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}
