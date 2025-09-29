import { Calendar } from "lucide-react";

export default function CompletedActCard({ image, title, desc, date, time, points }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
        {/* Share Icon */}
        <button className="absolute top-3 right-3 bg-white/90 rounded-full p-1 shadow hover:bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M4 12v-2m8-6l4 4-4 4m0-8l-4 4 4 4m8 6h-8v-4h8v4z" />
          </svg>
        </button>
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

        {/* Points Button */}
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
          {points} points
        </button>
      </div>
    </div>
  );
}
