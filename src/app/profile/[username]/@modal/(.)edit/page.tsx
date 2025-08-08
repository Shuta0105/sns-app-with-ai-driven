import { notFound } from "next/navigation";
import { getUserByUsername } from "@/lib/server-data";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import EditProfileModal from "@/components/profile/EditProfileModal";

interface EditProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function EditProfilePage({
  params,
}: EditProfilePageProps) {
  const { username } = await params;

  // ユーザー情報を取得
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  // 現在ログインしているユーザーを取得
  const { userId } = await auth();
  let isOwnProfile = false;

  if (userId) {
    // clerkIdを使ってユーザーを取得
    const currentUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    isOwnProfile = currentUser?.username === username;
  }

  // 自分のプロフィールでない場合は404
  if (!isOwnProfile) {
    notFound();
  }

  return <EditProfileModal user={user} />;
}
