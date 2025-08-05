"use client";

import { useState } from "react";

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState("foryou");

  return (
    <div className="flex">
      <button
        onClick={() => setActiveTab("foryou")}
        className={`flex-1 py-4 text-center font-semibold transition-colors relative ${
          activeTab === "foryou"
            ? "text-white"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        For you
        {activeTab === "foryou" && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
        )}
      </button>
      <button
        onClick={() => setActiveTab("following")}
        className={`flex-1 py-4 text-center font-semibold transition-colors relative ${
          activeTab === "following"
            ? "text-white"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        Following
        {activeTab === "following" && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
        )}
      </button>
    </div>
  );
}
