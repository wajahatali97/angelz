import React from "react";

export default function Button({
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  children,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`w-full bg-blue-500 text-white py-2 rounded-full 
        hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2 px-4
        ${className}`}
      style={{ 
        minHeight: "40px", 
        minWidth: "120px",
        cursor: loading || disabled ? "not-allowed" : "pointer" // 👈 cursor lock effect
      }}
    >
      {loading ? (
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
