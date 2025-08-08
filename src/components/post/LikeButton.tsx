"use client";

import { Heart } from "lucide-react";
import { useOptimistic, useState, startTransition } from "react";
import { toggleLike } from "@/lib/actions/likes";

interface LikeButtonProps {
  postId: string;
  initialLiked: boolean;
  likeCount: number;
}

export default function LikeButton({
  postId,
  initialLiked,
  likeCount,
}: LikeButtonProps) {
  const [optimisticLiked, addOptimisticLike] = useOptimistic(
    { liked: initialLiked, count: likeCount },
    (state, newLiked: boolean) => ({
      liked: newLiked,
      count: newLiked ? state.count + 1 : state.count - 1,
    })
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);

    // 楽観的更新をstartTransitionでラップ
    startTransition(() => {
      const newLiked = !optimisticLiked.liked;
      addOptimisticLike(newLiked);
    });

    try {
      const result = await toggleLike(postId);

      if (!result.success) {
        console.error("いいね操作に失敗しました:", result.error);
        // エラー時は楽観的更新を元に戻す
        startTransition(() => {
          addOptimisticLike(!optimisticLiked.liked);
        });
      }
    } catch (error) {
      console.error("いいね操作エラー:", error);
      // エラー時は楽観的更新を元に戻す
      startTransition(() => {
        addOptimisticLike(!optimisticLiked.liked);
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center space-x-1 sm:space-x-2 text-gray-500 cursor-pointer"
      style={{
        transition: "color 0.2s ease",
        color: optimisticLiked.liked ? "#ef4444" : "#6b7280",
      }}
      onMouseEnter={(e) => {
        if (!optimisticLiked.liked) {
          e.currentTarget.style.color = "#ef4444";
        }
        const icon = e.currentTarget.querySelector("div");
        if (icon) {
          icon.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!optimisticLiked.liked) {
          e.currentTarget.style.color = "#6b7280";
        }
        const icon = e.currentTarget.querySelector("div");
        if (icon) {
          icon.style.backgroundColor = "transparent";
        }
      }}
      onClick={handleLike}
    >
      <div
        className="p-1.5 sm:p-2 rounded-full"
        style={{
          transition: "background-color 0.2s ease",
          backgroundColor: optimisticLiked.liked
            ? "rgba(239, 68, 68, 0.1)"
            : "transparent",
        }}
      >
        <Heart
          className={`h-3 w-3 sm:h-4 sm:w-4 ${isLoading ? "opacity-50" : ""}`}
          fill={optimisticLiked.liked ? "#ef4444" : "none"}
        />
      </div>
      <span className="text-xs sm:text-sm">{optimisticLiked.count}</span>
    </div>
  );
}
