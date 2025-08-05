"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  postCount: string;
}

export default function ProfileHeader({ postCount }: ProfileHeaderProps) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className="flex items-center p-4">
      <button
        onClick={handleBackClick}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors mr-4"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div>
        <h1 className="text-xl font-bold">Irish</h1>
        <p className="text-gray-500 text-sm">{postCount}</p>
      </div>
      <button className="ml-auto p-2 rounded-full hover:bg-gray-800 transition-colors">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}
