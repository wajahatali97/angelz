import React from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActCard({
  id,
  title,
  desc,
  date,
  time,
  points,
  buttonText,
  type, // pending | completed | other
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type?.toLowerCase() === "pending") {
      navigate(`/pending/${id}`, {
        state: { id, title, desc, date, time, points },
      });
    } else if (type?.toLowerCase() === "completed") {
      navigate(`/completed/${id}`, {
        state: { id, title, desc, date, time, points },
      });
    } else {
      navigate(`/act/${id}`, {
        state: { id, title, desc, date, time, points },
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md">
      {/* Image Section */}
      <div className="relative">
        <img
          src={`https://placehold.co/600x400?text=${type}+${id}`}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          USA
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{desc}</p>

        {/* Date/Time */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span>
            {date} | {time}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleClick}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
        >
          {points ? `${points} points` : buttonText}
        </button>
      </div>
    </div>
  );
}
