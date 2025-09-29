import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // react-router-dom use kar rahe ho?

export default function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center px-4 py-3 bg-white">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)} // ek step back
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        
      </button>

      {/* Title - Back ke pas hi */}
      <h1 className="ml-4 text-lg sm:text-xl font-semibold text-gray-800">
        Profile
      </h1>
    </header>
  );
}
