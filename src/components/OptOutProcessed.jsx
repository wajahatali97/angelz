import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function OptOutProcessed({ onClose, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={onClose} // ✅ Click outside to close
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
            className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-10 w-[90%] max-w-md text-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>

            {/* Emoji */}
            <div className="text-6xl mb-4 animate-bounce">😌</div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Your request has been processed.
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed">
              You will be notified shortly whether it has been accepted or
              rejected.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
