import React, { useState } from "react";
import { X } from "lucide-react";

export default function OrganizationProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    username: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    organizationType: "",
    services: "",
    bio: "",
    profileImage: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Uploaded Images:", images);
  };

  return (
    <div className="flex flex-col items-center px-4 py-16">
      <div className="bg-white w-[1002px] h-auto rounded-2xl shadow-md p-12">
        <div className="max-w-2xl w-full mx-auto">
          {/* Heading */}
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10 tracking-tight">
            Organization Profile
          </h2>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={formData.profileImage || "https://via.placeholder.com/120"}
                className="w-32 h-32 rounded-full border-2 border-orange-500 object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-full cursor-pointer shadow-md hover:bg-orange-600 transition">
                Edit
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData({
                        ...formData,
                        profileImage: URL.createObjectURL(file),
                      });
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Kristiene"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Williamson"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Email + Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="kristiene@mail.com"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="+92-300-1234567"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Street, Karachi"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Karachi"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Sindh"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Zip + Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="74000"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Pakistan"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Type
                </label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select type</option>
                  <option value="ngo">NGO</option>
                  <option value="company">Company</option>
                  <option value="startup">Startup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <select
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select service</option>
                  <option value="it">IT</option>
                  <option value="consulting">Consulting</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write about your organization (max 150 chars)"
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
              />
            </div>

            {/* Upload Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-50 text-2xl text-gray-500">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img
                      src={img}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium text-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
