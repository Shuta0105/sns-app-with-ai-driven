"use client";

import { useState, useOptimistic, startTransition } from "react";
import { toggleFollow } from "@/lib/actions/follows";

interface FollowButtonProps {
  targetUserId: string;
  initialIsFollowing: boolean;
  isOwnProfile: boolean;
}

export default function FollowButton({
  targetUserId,
  initialIsFollowing,
  isOwnProfile,
}: FollowButtonProps) {
  const [optimisticFollow, addOptimisticFollow] = useOptimistic(
    { isFollowing: initialIsFollowing },
    (state, newIsFollowing: boolean) => ({
      isFollowing: newIsFollowing,
    })
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    if (isLoading || isOwnProfile) return;

    setIsLoading(true);

    // 楽観的更新
    startTransition(() => {
      const newIsFollowing = !optimisticFollow.isFollowing;
      addOptimisticFollow(newIsFollowing);
    });

    try {
      const result = await toggleFollow(targetUserId);

      if (!result.success) {
        console.error("フォロー操作に失敗しました:", result.error);
        // エラー時は楽観的更新を元に戻す
        startTransition(() => {
          addOptimisticFollow(!optimisticFollow.isFollowing);
        });
      }
    } catch (error) {
      console.error("フォロー操作エラー:", error);
      // エラー時は楽観的更新を元に戻す
      startTransition(() => {
        addOptimisticFollow(!optimisticFollow.isFollowing);
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isOwnProfile) {
    return null; // 自分のプロフィールではフォローボタンを表示しない
  }

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`px-4 py-2 rounded-full font-bold transition-colors ${
        optimisticFollow.isFollowing
          ? "bg-gray-800 text-white hover:bg-red-600 hover:text-white"
          : "bg-white text-black hover:bg-gray-200"
      } disabled:opacity-50`}
    >
      {isLoading
        ? "Loading..."
        : optimisticFollow.isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
}
