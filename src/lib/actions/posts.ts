"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(content: string) {
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

    // 投稿内容のバリデーション
    if (!content || content.trim().length === 0) {
      throw new Error("投稿内容を入力してください");
    }

    if (content.length > 280) {
      throw new Error("投稿内容は280文字以内で入力してください");
    }

    // 投稿を作成
    const post = await prisma.post.create({
      data: {
        content: content.trim(),
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    // キャッシュを再検証
    revalidatePath("/");
    revalidatePath("/profile/[username]");

    return { success: true, post };
  } catch (error) {
    console.error("投稿作成エラー:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "投稿の作成に失敗しました",
    };
  }
}

export async function createReply(content: string, parentId: string) {
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

    // 親投稿が存在するか確認
    const parentPost = await prisma.post.findUnique({
      where: { id: parentId },
    });

    if (!parentPost) {
      throw new Error("返信先の投稿が見つかりません");
    }

    // 投稿内容のバリデーション
    if (!content || content.trim().length === 0) {
      throw new Error("返信内容を入力してください");
    }

    if (content.length > 280) {
      throw new Error("返信内容は280文字以内で入力してください");
    }

    // 返信投稿を作成
    const reply = await prisma.post.create({
      data: {
        content: content.trim(),
        userId: user.id,
        parentId: parentId,
      },
      include: {
        user: true,
        parent: {
          include: {
            user: true,
          },
        },
      },
    });

    // キャッシュを再検証
    revalidatePath("/");
    revalidatePath("/profile/[username]");
    revalidatePath(`/post/${parentId}`);

    return { success: true, reply };
  } catch (error) {
    console.error("返信作成エラー:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "返信の作成に失敗しました",
    };
  }
}
