import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

const loadUser = async () => {
  const token = localStorage.getItem("authToken");

  const res = await fetch("/api/users/user-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  console.log("Profile API Response:", data);

  if (data?.userDetails) {
    setUser(data.userDetails);
  }
};


  useEffect(() => {
    loadUser();

    // Listener for profile update
    const handleUserUpdated = () => {
      loadUser();
    };

    window.addEventListener("userUpdated", handleUserUpdated);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdated);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h1>

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={
            user.profilePic
              ? typeof user.profilePic === "string"
                ? user.profilePic
                : URL.createObjectURL(user.profilePic)
              : "https://i.pravatar.cc/150"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {user.name} {user.last_name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Phone</h3>
          <p>{user.contact_no || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{user.address || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">City</h3>
          <p>{user.city || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">State</h3>
          <p>{user.state || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Zip</h3>
          <p>{user.zip || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Country</h3>
          <p>{user.country || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Timing</h3>
          <p>{user.timing || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Expertise</h3>
          <p>{user.expertise || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Volunteering</h3>
          <p>{user.volunteering || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Organization</h3>
          <p>{user.organization || "N/A"}</p>
        </div>
        <div className="p-4 border rounded-lg md:col-span-2">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p>{user.description || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
