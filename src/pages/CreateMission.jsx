import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // ✅ Arrow icon import

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
    <div className="flex flex-col items-center px-4 py-16">
      <div className="bg-white w-[1002px] h-auto rounded-2xl shadow-md p-12">
        <div className="max-w-2xl w-full mx-auto">
          {/* Heading with Arrow */}
          <div className="relative mb-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-3xl font-semibold text-gray-900 text-center tracking-tight">
              Create Mission
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mission Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Name *
              </label>
              <input
                type="text"
                name="missionName"
                value={formData.missionName}
                onChange={handleChange}
                placeholder="e.g., Beach Cleanup"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Mission Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Description *
              </label>
              <textarea
                name="missionDescription"
                value={formData.missionDescription}
                onChange={handleChange}
                placeholder="Describe the mission scope, goals, and tasks..."
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                required
              />
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Date *
                </label>
                <input
                  type="date"
                  name="missionDate"
                  value={formData.missionDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Time *
                </label>
                <input
                  type="time"
                  name="missionTime"
                  value={formData.missionTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Mission Type + Volunteers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Type *
                </label>
                <select
                  name="missionType"
                  value={formData.missionType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="cleanup">Cleanup</option>
                  <option value="teaching">Teaching</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volunteers Required *
                </label>
                <select
                  name="volunteersRequired"
                  value={formData.volunteersRequired}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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

            {/* Preferred Volunteer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Volunteer *
              </label>
              <select
                name="preferredVolunteer"
                value={formData.preferredVolunteer}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Any</option>
                <option value="students">Students</option>
                <option value="professionals">Professionals</option>
                <option value="retired">Retired</option>
              </select>
            </div>

            {/* Points */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points on Mission *
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                placeholder="Points for completing this mission"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Interactions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Pictures
              </label>
              <input
                type="file"
                name="pictures"
                multiple
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-6 pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50 transition"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
              >
                Create Mission
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
