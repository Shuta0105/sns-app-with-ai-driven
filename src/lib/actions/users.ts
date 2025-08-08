"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// Service Role Keyを使用したSupabaseクライアント
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function getCurrentUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        bio: true,
      },
    });

    return user;
  } catch (error) {
    console.error("現在のユーザー情報取得エラー:", error);
    return null;
  }
}

// 画像アップロード用の関数
async function uploadImage(
  file: File,
  folder: string,
  userId: string
): Promise<string> {
  try {
    // ファイルサイズチェック（5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("ファイルサイズは5MB以下にしてください");
    }

    // ファイル形式チェック
    if (!file.type.startsWith("image/")) {
      throw new Error("画像ファイルを選択してください");
    }

    // ファイル名を生成（ユニークにするためタイムスタンプを追加）
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${userId}_${timestamp}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    // Supabase Storageにアップロード（Service Role Key使用）
    const { error } = await supabaseAdmin.storage
      .from("user-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase Storage エラー:", error);
      if (error.message.includes("bucket")) {
        throw new Error(
          "ストレージバケットが見つかりません。管理者に連絡してください。"
        );
      } else if (error.message.includes("permission")) {
        throw new Error("アップロード権限がありません。");
      } else {
        throw new Error(`画像アップロードエラー: ${error.message}`);
      }
    }

    // 公開URLを取得
    const { data: urlData } = supabaseAdmin.storage
      .from("user-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("画像のアップロードに失敗しました");
  }
}

export async function updateProfile(data: {
  displayName: string;
  username: string;
  bio?: string;
  coverImageUrl?: string;
  profileImageUrl?: string;
  coverImageFile?: File;
  profileImageFile?: File;
}) {
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

    // 入力値のバリデーション
    if (!data.displayName || data.displayName.trim().length === 0) {
      throw new Error("表示名を入力してください");
    }

    if (data.displayName.length > 50) {
      throw new Error("表示名は50文字以内で入力してください");
    }

    if (data.bio && data.bio.length > 160) {
      throw new Error("自己紹介は160文字以内で入力してください");
    }

    // 画像URLのバリデーション
    if (data.coverImageUrl && data.coverImageUrl.length > 255) {
      throw new Error("カバー画像URLが長すぎます");
    }

    // 画像アップロード処理
    let finalCoverImageUrl = data.coverImageUrl;

    if (data.coverImageFile) {
      finalCoverImageUrl = await uploadImage(
        data.coverImageFile,
        "covers",
        user.id
      );
    }

    // プロフィールを更新
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        displayName: data.displayName.trim(),
        username: user.username, // 既存のusernameを保持
        bio: data.bio?.trim() || null,
        coverImageUrl: finalCoverImageUrl?.trim() || null,
        profileImageUrl: user.profileImageUrl, // 既存のプロフィール画像を保持
      },
    });

    // キャッシュを再検証
    revalidatePath("/");
    revalidatePath("/profile/[username]");
    revalidatePath(`/profile/${updatedUser.username}`);
    revalidatePath(`/profile/${user.username}`);

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "プロフィールの更新に失敗しました",
    };
  }
}
