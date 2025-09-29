import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../campaigns/FormField.jsx";
import { getProfile, updateProfile } from "../services/userService.js";

export default function EditProfile() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    contact_no: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    timing: "",
    expertise: "",
    volunteering: "",
    organization: "",
  });

  // 🟢 Load profile data
  useEffect(() => {
    (async () => {
      const user = await getProfile();
      console.log("Profile API response:", user);

      if (user) {
        let finalEmail = user.email;

        // 🟢 Fallback to localStorage email if API gives empty
        if (!finalEmail || finalEmail.trim() === "") {
          const storedUser = JSON.parse(localStorage.getItem("userProfile"));
          if (storedUser?.email) {
            finalEmail = storedUser.email;
          }
        }

        setFormData({
          ...user,
          email: finalEmail || "",
        });

        if (user.image) setProfileImage(user.image);
      }
    })();
  }, []);

  // 🟢 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🟢 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = { ...formData, image: profileImage };
      await updateProfile(updated);

      // 🟢 LocalStorage me bhi update karo
      localStorage.setItem("userProfile", JSON.stringify(updated));

      // 🟢 Header ko notify karo
      window.dispatchEvent(new Event("authChange"));

      alert("✅ Profile updated successfully!");
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
            {/* 🟢 Email is fixed from localStorage if API empty */}
            <FormField
              label="Email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
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
            <FormField
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <FormField
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <FormField
              label="State"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <FormField
              label="Zip"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
            <FormField
              label="Country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <FormField
              label="Timing"
              type="text"
              name="timing"
              value={formData.timing}
              onChange={handleChange}
            />
            <FormField
              label="Expertise"
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
            />
            <FormField
              label="Volunteering"
              type="text"
              name="volunteering"
              value={formData.volunteering}
              onChange={handleChange}
            />
            <FormField
              label="Organization"
              type="text"
              name="organization"
              value={formData.organization}
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
