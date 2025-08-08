import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  // Clerkのwebhookシークレットを取得
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
    );
  }

  // リクエストヘッダーを取得
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // ヘッダーが存在しない場合はエラー
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // リクエストボディを取得
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Svixインスタンスを作成
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // webhookの署名を検証
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // イベントタイプを取得
  const eventType = evt.type;

  try {
    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        username,
        first_name,
        last_name,
        image_url,
      } = evt.data;

      // メールアドレスを取得
      const email = email_addresses?.[0]?.email_address;

      if (!email) {
        console.error("No email address found for user:", id);
        return new Response("No email address found", { status: 400 });
      }

      // ユーザー名を生成
      const displayName = first_name
        ? `${first_name} ${last_name ? `${last_name}` : ""}`
        : username;

      // ユーザー名の空白をアンダーバーに変換
      const normalizedUsername = (username || "").replace(/\s+/g, "_");

      // データベースにユーザーを作成
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email,
          username: normalizedUsername,
          displayName: displayName || "",
          profileImageUrl: image_url,
        },
      });

      console.log("User created in database:", id);
    }

    if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        username,
        first_name,
        last_name,
        image_url,
      } = evt.data;

      // メールアドレスを取得
      const email = email_addresses?.[0]?.email_address;

      if (!email) {
        console.error("No email address found for user:", id);
        return new Response("No email address found", { status: 400 });
      }

      // ユーザー名を生成（usernameがない場合はemailから生成）
      const displayName = first_name
        ? `${first_name} ${last_name ? `${last_name}` : ""}`
        : username;

      // ユーザー名の空白をアンダーバーに変換
      const normalizedUsername = (username || "").replace(/\s+/g, "_");

      // データベースのユーザーを更新
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email,
          username: normalizedUsername,
          displayName: displayName || "",
          profileImageUrl: image_url,
        },
      });

      console.log("User updated in database:", id);
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;

      // データベースからユーザーを削除
      await prisma.user.delete({
        where: { clerkId: id },
      });

      console.log("User deleted from database:", id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database operation failed:", error);
    return new Response("Database operation failed", { status: 500 });
  }
}
