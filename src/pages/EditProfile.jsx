import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../campaigns/FormField.jsx"; // Reusable field

export default function EditProfile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    contact_no: "",
    description: "", // bio
    email: "",
    password: "",
    expertise: "",
    preferences: "",
    available_timing: [
      { day: "Monday", from: "09:00", to: "17:00" },
      { day: "Tuesday", from: "10:00", to: "16:00" },
    ],
  });

  // ✅ Load current user profile from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("/api/users/user-profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load profile");

        const userData = data.userDetails;

        setFormData((prev) => ({
          ...prev,
          name: userData.name || "",
          last_name: userData.last_name || "",
          contact_no: userData.contact_no || "",
          description: userData.description || "",
          email: userData.email || "",
          password: "",
          expertise: userData.expertise || "",
          preferences: userData.preferences || "",
        }));

        if (userData.image) setProfileImage(userData.image);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Submit (update API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      // ✅ Clean payload (email not sent, password optional)
      const payload = {
        name: formData.name,
        last_name: formData.last_name,
        contact_no: formData.contact_no,
        description: formData.description,
        ...(formData.password ? { password: formData.password } : {}),
        available_timing: formData.available_timing,
        expertise: formData.expertise ? [formData.expertise] : [],
        preferences: formData.preferences ? [formData.preferences] : [],
      };

      const res = await fetch("/api/users/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("✅ Profile updated successfully!");
      console.log("Updated user data:", data);

      // 🔄 Notify ProfilePage to reload fresh data
      window.dispatchEvent(new Event("userUpdated"));
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    }
  };

  return (
    <div className="flex items-center justify-center p-6 w-full max-w-5xl mx-auto mt-20">
      <div className="bg-white rounded-3xl shadow-lg w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        {/* Profile Image */}
        <div className="mb-6 text-center">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img
              src={profileImage || "https://i.pravatar.cc/40"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover border"
            />
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          {/* Basic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="First Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormField
              label="Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <FormField
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled // ✅ Email is now locked
            />
            <FormField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
            />
            <FormField
              label="Contact Number"
              type="text"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <FormField
            label="Bio"
            type="textarea"
            name="description"
            placeholder="Write about yourself (Max 140 char.)"
            value={formData.description}
            onChange={handleChange}
            maxLength={140}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
