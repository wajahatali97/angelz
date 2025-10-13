import React, { useState } from "react";
import visibleEye from "../assets/streamline_visible-solid.png"; // 👈 path adjust karein apne folder ke hisab se
import { EyeOff } from "lucide-react"; // cross-eye icon (from lucide-react, lightweight & modern)

export default function FormField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  options = [],
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  return (
    <div className="mb-4 relative">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full border rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          {...rest}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...rest}
        />
      ) : (
        <div className="relative">
          <input
            type={getInputType()}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border rounded-3xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            {...rest}
          />

          {/* 👁️ Password Toggle */}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                // 👁️ Normal eye icon (uploaded image)
                <img src={visibleEye} alt="Show" className="w-5 h-5" />
              ) : (
                // 🚫 Crossed eye icon from lucide-react
                <EyeOff size={20} />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
