import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CompletedActDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p className="p-6">No data found!</p>;
  }

  const { title, desc, date, time, points } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center px-6 py-4 border-b bg-white shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="flex-1 text-center text-lg sm:text-xl font-semibold text-gray-800">
          Completed Act
        </h1>
        <div className="w-6" />
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600">{desc}</p>
          <p className="text-sm text-gray-500">
            {date} | {time}
          </p>
          <p className="font-medium text-blue-600">{points} points earned</p>
        </div>
      </div>
    </div>
  );
}
