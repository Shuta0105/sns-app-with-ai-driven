"use client";

import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function UserProfileInfo() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse bg-gray-200 rounded-full h-8 w-8"></div>
        <div className="animate-pulse bg-gray-200 rounded h-4 w-20"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {user.imageUrl && (
          <Image
            src={user.imageUrl}
            alt={user.fullName || "ユーザー"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium text-gray-700">
          {user.fullName || user.emailAddresses[0]?.emailAddress}
        </span>
      </div>
      <SignOutButton>
        <button className="text-sm text-red-600 hover:text-red-700 transition-colors">
          ログアウト
        </button>
      </SignOutButton>
    </div>
  );
}
