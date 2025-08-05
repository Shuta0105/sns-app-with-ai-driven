"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trend, SuggestedUser } from "@/lib/types";

interface RightSidebarContentProps {
  trends: Trend[];
  suggestedUsers: SuggestedUser[];
}

export default function RightSidebarContent({
  trends,
  suggestedUsers,
}: RightSidebarContentProps) {
  return (
    <>
      {/* Premium Promotion */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-2">30% off Premium</h3>
        <p className="text-sm mb-4 opacity-90">
          Experience the best of X this Summer.
        </p>
        <Button
          className="bg-black text-white font-bold rounded-full px-6"
          style={{ transition: "background-color 0.2s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#000000";
          }}
        >
          Subscribe
        </Button>
      </div>

      {/* What's happening */}
      <div className="bg-gray-900 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">What&apos;s happening</h2>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">
            今日TENBLANK世界デビュー
          </div>
          <div className="text-sm text-gray-300 leading-tight">
            佐藤健/宮崎駿/町田啓太/志尊淳がバンド結成！「グラスハート」本日よりNetflixで独占配信。ウォッチパーティーも19時から開催！
          </div>
          <div className="text-sm text-gray-500 mt-1">
            ● Promoted by Netflix Japan | ネットフリックス
          </div>
        </div>

        {trends.map((trend, index) => (
          <div
            key={index}
            className="py-3 -mx-4 px-4 cursor-pointer"
            style={{ transition: "background-color 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1f2937";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">{trend.category}</div>
                <div className="font-bold">{trend.topic}</div>
                <div className="text-sm text-gray-500">{trend.posts}</div>
              </div>
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        ))}

        <div className="pt-3">
          <span
            className="text-blue-500 cursor-pointer"
            style={{ transition: "text-decoration 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Show more
          </span>
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-gray-900 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>

        {suggestedUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="font-bold">{user.avatar}</span>
              </div>
              <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.username}</div>
              </div>
            </div>
            <Button
              className="bg-white text-black font-bold rounded-full px-6"
              style={{ transition: "background-color 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
