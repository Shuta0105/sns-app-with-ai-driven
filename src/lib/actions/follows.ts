"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFollow(targetUserId: string): Promise<{
  success: boolean;
  isFollowing: boolean;
  error?: string;
}> {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("認証が必要です");
    }

    // 現在のユーザーを取得
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!currentUser) {
      throw new Error("ユーザーが見つかりません");
    }

    // 自分自身をフォローできないようにする
    if (currentUser.id === targetUserId) {
      throw new Error("自分自身をフォローすることはできません");
    }

    // 対象ユーザーが存在するか確認
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new Error("フォロー対象のユーザーが見つかりません");
    }

    // 既存のフォロー関係を確認
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollow) {
      // フォローを削除（アンフォロー）
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUser.id,
            followingId: targetUserId,
          },
        },
      });
    } else {
      // フォローを追加
      await prisma.follow.create({
        data: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      });
    }

    // キャッシュを再検証
    revalidatePath("/");
    revalidatePath("/profile/[username]");
    revalidatePath(`/profile/${targetUser.username}`);
    revalidatePath(`/profile/${currentUser.username}`);

    return {
      success: true,
      isFollowing: !existingFollow,
    };
  } catch (error) {
    console.error("フォロー操作エラー:", error);
    return {
      success: false,
      isFollowing: false,
      error:
        error instanceof Error ? error.message : "フォロー操作に失敗しました",
    };
  }
}

export async function checkFollowStatus(targetUserId: string): Promise<{
  isFollowing: boolean;
}> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { isFollowing: false };
    }

    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!currentUser) {
      return { isFollowing: false };
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      },
    });

    return { isFollowing: !!follow };
  } catch (error) {
    console.error("フォロー状態確認エラー:", error);
    return { isFollowing: false };
  }
}
