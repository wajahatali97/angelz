import React from "react";
import { X } from "lucide-react";
import trophy from "../assets/trophy.png"; // 🏆 apni image ka sahi path lagao

export default function ConfirmationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-md w-[90%] text-center animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Trophy Icon */}
        <img
          src={trophy}
          alt="Trophy"
          className="w-16 h-16 mx-auto mb-4"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Confirmation of job successfully completed
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mt-2">
          You have earned <span className="font-semibold text-gray-700">150 points</span>. Earn 500 more to become a <span className="font-semibold text-purple-600">Purple Angel</span> and unlock the new adventure of helping others.
        </p>
      </div>
    </div>
  );
}
