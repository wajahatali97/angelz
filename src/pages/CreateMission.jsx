import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline"; // ⭐ icon

export default function CreateMission() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    missionName: "",
    missionDescription: "",
    missionDate: "",
    missionTime: "",
    missionType: "",
    volunteersRequired: "",
    preferredVolunteer: "",
    points: "",
    interactions: {
      comments: false,
      likes: false,
      shares: false,
    },
    pictures: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interactions: {
          ...prev.interactions,
          [name]: checked,
        },
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        pictures: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleReset = () => {
    setFormData({
      missionName: "",
      missionDescription: "",
      missionDate: "",
      missionTime: "",
      missionType: "",
      volunteersRequired: "",
      preferredVolunteer: "",
      points: "",
      interactions: {
        comments: false,
        likes: false,
        shares: false,
      },
      pictures: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 Mission Created:", formData);
    handleReset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8">
        {/* 🔙 Arrow + Heading center aligned */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            ←
          </button>
          <h2 className="text-3xl font-semibold text-gray-800">
            Create Mission
          </h2>
        </div>

        {/* Subheading */}
        <p className="text-gray-500 text-center mb-8">
          Fill all fields and submit to create a new mission.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mission Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mission Name *
            </label>
            <input
              type="text"
              name="missionName"
              value={formData.missionName}
              onChange={handleChange}
              placeholder="e.g., Beach Cleanup"
              className="w-full border rounded-full px-4 py-3 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Mission Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mission Description *
            </label>
            <textarea
              name="missionDescription"
              value={formData.missionDescription}
              onChange={handleChange}
              placeholder="Describe The Mission Scope, Goals, And Tasks..."
              className="w-full border rounded-2xl px-4 py-3 h-28 focus:ring focus:ring-blue-300 outline-none resize-none"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Mission Date *
              </label>
              <input
                type="date"
                name="missionDate"
                value={formData.missionDate}
                onChange={handleChange}
                className="w-full border rounded-full px-4 py-3 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mission Time *
              </label>
              <input
                type="time"
                name="missionTime"
                value={formData.missionTime}
                onChange={handleChange}
                className="w-full border rounded-full px-4 py-3 focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>
          </div>

          {/* Mission Type & Volunteers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Mission Type *
              </label>
              <select
                name="missionType"
                value={formData.missionType}
                onChange={handleChange}
                className="w-full border rounded-full px-4 py-3 focus:ring focus:ring-blue-300 outline-none"
                required
              >
                <option value="">Select Type</option>
                <option value="cleanup">Cleanup</option>
                <option value="teaching">Teaching</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Volunteers Required *
              </label>
              <select
                name="volunteersRequired"
                value={formData.volunteersRequired}
                onChange={handleChange}
                className="w-full border rounded-full px-4 py-3 focus:ring focus:ring-blue-300 outline-none"
                required
              >
                <option value="">Choose 1-5</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Volunteer & Points */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Preferred Volunteer
              </label>
              <select
                name="preferredVolunteer"
                value={formData.preferredVolunteer}
                onChange={handleChange}
                className="w-full border rounded-full px-4 py-3 focus:ring focus:ring-blue-300 outline-none"
              >
                <option value="">Any</option>
                <option value="students">Students</option>
                <option value="professionals">Professionals</option>
                <option value="retired">Retired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Points on Mission *
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  placeholder="Total points on mission"
                  className="w-full border rounded-full px-4 py-3 pr-10 focus:ring focus:ring-blue-300 outline-none"
                  required
                />
                <StarIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Interactions */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Allow Interactions
            </label>
            <div className="flex gap-6">
              {["comments", "likes", "shares"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={item}
                    checked={formData.interactions[item]}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Mission Pictures */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Mission Pictures
            </label>
            <input
              type="file"
              name="pictures"
              multiple
              onChange={handleChange}
              className="w-full border rounded-full px-4 py-3"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can upload multiple images. Thumbnails will appear below.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Create Mission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
