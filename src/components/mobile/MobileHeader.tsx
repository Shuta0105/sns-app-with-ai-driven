"use client";

import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

export default function MobileHeader() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  function handleMobileSidebarToggle() {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="sticky top-0 bg-black border-b border-gray-800 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleMobileSidebarToggle}
            className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <span className="text-sm font-bold text-white">I</span>
          </button>
          <h1 className="text-lg font-bold">𝕏</h1>
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
}
