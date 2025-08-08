"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string): Promise<{
  success: boolean;
  liked: boolean;
  error?: string;
}> {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("認証が必要です");
    }

    // ユーザーが存在するか確認
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    // 投稿が存在するか確認
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("投稿が見つかりません");
    }

    // 既存のいいねを確認
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      // いいねを削除
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId: postId,
          },
        },
      });
    } else {
      // いいねを追加
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: postId,
        },
      });
    }

    // キャッシュを再検証
    revalidatePath("/");
    revalidatePath("/profile/[username]");
    revalidatePath(`/post/${postId}`);

    return {
      success: true,
      liked: !existingLike,
    };
  } catch (error) {
    console.error("いいね操作エラー:", error);
    return {
      success: false,
      liked: false,
      error:
        error instanceof Error ? error.message : "いいねの操作に失敗しました",
    };
  }
}

export async function checkLikeStatus(postId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { liked: false };
    }

    // ユーザーが存在するか確認
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return { liked: false };
    }

    // いいねの状態を確認
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    return { liked: !!like };
  } catch (error) {
    console.error("いいね状態確認エラー:", error);
    return { liked: false };
  }
}
