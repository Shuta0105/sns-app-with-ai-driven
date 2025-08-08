"use client";

import {
  MessageCircle,
  Repeat2,
  BarChart3,
  Bookmark,
  Share,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostWithUser } from "@/lib/types";
import LikeButton from "./LikeButton";

interface TweetProps {
  tweet: PostWithUser;
  initialLiked?: boolean;
}

export default function Tweet({ tweet, initialLiked = false }: TweetProps) {
  // 時間のフォーマット関数
  function formatTime(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "今";
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  }

  // ユーザーのアバター表示用の関数
  function getAvatarDisplay(user: PostWithUser["user"]): string {
    if (user.profileImageUrl) {
      return user.displayName.charAt(0);
    }
    return user.displayName.charAt(0);
  }

  return (
    <div
      className="border-b border-gray-800 p-3 sm:p-4 cursor-pointer"
      style={{
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(17, 24, 39, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div className="flex space-x-2 sm:space-x-3">
        {/* Avatar */}
        <Link
          href={`/profile/${tweet.user.username}`}
          className="flex-shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
            {tweet.user.profileImageUrl ? (
              <Image
                src={tweet.user.profileImageUrl}
                alt={tweet.user.displayName}
                width={48}
                height={48}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm sm:text-lg font-bold text-white">
                {getAvatarDisplay(tweet.user)}
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href={`/profile/${tweet.user.username}`}
              className="hover:underline"
            >
              <span className="font-bold text-white text-sm sm:text-base">
                {tweet.user.displayName}
              </span>
            </Link>
            <Link
              href={`/profile/${tweet.user.username}`}
              className="hover:underline"
            >
              <span className="text-gray-500 text-xs sm:text-sm">
                @{tweet.user.username}
              </span>
            </Link>
            <span className="text-gray-500 text-xs sm:text-sm">·</span>
            <Link href={`/post/${tweet.id}`} className="hover:underline">
              <span className="text-gray-500 text-xs sm:text-sm">
                {formatTime(tweet.createdAt)}
              </span>
            </Link>
            <div className="ml-auto">
              <MoreHorizontal
                className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 cursor-pointer"
                style={{ transition: "color 0.2s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b7280";
                }}
              />
            </div>
          </div>

          {/* Content */}
          <Link href={`/post/${tweet.id}`} className="block">
            <div className="mt-1 sm:mt-2 text-white text-sm sm:text-base leading-relaxed">
              {tweet.content}
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center justify-between mt-2 sm:mt-3 max-w-md">
            <div
              className="flex items-center space-x-1 sm:space-x-2 text-gray-500 cursor-pointer"
              style={{ transition: "color 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3b82f6";
                const icon = e.currentTarget.querySelector("div");
                if (icon) {
                  icon.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                const icon = e.currentTarget.querySelector("div");
                if (icon) {
                  icon.style.backgroundColor = "transparent";
                }
              }}
            >
              <div
                className="p-1.5 sm:p-2 rounded-full"
                style={{ transition: "background-color 0.2s ease" }}
              >
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs sm:text-sm">
                {tweet._count?.replies || 0}
              </span>
            </div>

            <div
              className="flex items-center space-x-1 sm:space-x-2 text-gray-500 cursor-pointer"
              style={{ transition: "color 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#10b981";
                const icon = e.currentTarget.querySelector("div");
                if (icon) {
                  icon.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                const icon = e.currentTarget.querySelector("div");
                if (icon) {
                  icon.style.backgroundColor = "transparent";
                }
              }}
            >
              <div
                className="p-1.5 sm:p-2 rounded-full"
                style={{ transition: "background-color 0.2s ease" }}
              >
                <Repeat2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs sm:text-sm">0</span>
            </div>

            <LikeButton
              postId={tweet.id}
              initialLiked={initialLiked}
              likeCount={tweet._count?.likes || 0}
            />

            <div
              className="flex items-center space-x-1 sm:space-x-2 text-gray-500 cursor-pointer"
              style={{ transition: "color 0.2s ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3b82f6";
                const icon = e.currentTarget.querySelector("div");
                if (icon) {
                  icon.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
                const icon = e.currentTarget.querySelector("div");
                if (icon) {
                  icon.style.backgroundColor = "transparent";
                }
              }}
            >
              <div
                className="p-1.5 sm:p-2 rounded-full"
                style={{ transition: "background-color 0.2s ease" }}
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs sm:text-sm">0</span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <div
                className="p-1.5 sm:p-2 rounded-full text-gray-500 cursor-pointer"
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3b82f6";
                  e.currentTarget.style.backgroundColor =
                    "rgba(59, 130, 246, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b7280";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <div
                className="p-1.5 sm:p-2 rounded-full text-gray-500 cursor-pointer"
                style={{ transition: "all 0.2s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#3b82f6";
                  e.currentTarget.style.backgroundColor =
                    "rgba(59, 130, 246, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b7280";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Share className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
