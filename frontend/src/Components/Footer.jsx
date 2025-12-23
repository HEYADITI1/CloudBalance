import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 h-16 z-30 flex items-center">
      <div className="w-full px-6 flex items-center justify-center relative">
        
        <button className="absolute left-6 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          <svg
            className="w-4 h-4 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 9 18a19.5 19.5 0 0 1-7-7A19.79 19.79 0 0 1 1 2.18 2 2 0 0 1 3 0h4.09a2 2 0 0 1 2 1.72c.12.81.37 1.59.72 2.32a2 2 0 0 1-.45 2.18L8 8a16 16 0 0 0 8 8l1.78-1.34a2 2 0 0 1 2.18-.45c.73.35 1.51.6 2.32.72a2 2 0 0 1 1.72 2z"/>
          </svg>
          Contact Us
        </button>

        <div className="text-xs text-gray-500 text-center">
          CloudKeeper 2025 | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
