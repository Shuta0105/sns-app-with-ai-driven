"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthNav() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex space-x-4">
        <div className="animate-pulse bg-gray-200 rounded h-8 w-16"></div>
        <div className="animate-pulse bg-gray-200 rounded h-8 w-16"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          href="/profile"
          className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          プロフィール
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/sign-in"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        ログイン
      </Link>
      <Link
        href="/sign-up"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        新規登録
      </Link>
    </div>
  );
}
