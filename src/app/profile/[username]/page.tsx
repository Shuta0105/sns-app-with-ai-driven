import { Suspense } from "react";
import { notFound } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import {
  getUserByUsername,
  getUserPosts,
  getFollowCounts,
} from "@/lib/server-data";
import { getPostCount } from "@/lib/helpers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePosts from "@/components/profile/ProfilePosts";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import MobileProfileHeader from "@/components/mobile/MobileProfileHeader";

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  // ユーザー情報を取得
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  // ユーザーの投稿とフォロー数を取得
  const [posts, followCounts] = await Promise.all([
    getUserPosts(username),
    getFollowCounts(user.id),
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex">
          {/* Left Sidebar */}
          <div className="w-64 fixed h-full">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64 max-w-2xl border-x border-gray-800">
            {/* Header */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 z-10">
              <ProfileHeader postCount={getPostCount(posts)} />
            </div>

            {/* Scrollable Content */}
            <div className="h-screen overflow-y-auto">
              {/* Profile Banner */}
              <div className="relative h-48 bg-gradient-to-r from-gray-700 to-gray-900">
                {user.coverImageUrl ? (
                  <img
                    src={user.coverImageUrl}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center border-4 border-black">
                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-white">
                        {user.displayName.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <Suspense
                fallback={<div className="p-4">Loading profile info...</div>}
              >
                <ProfileInfo user={user} followCounts={followCounts} />
              </Suspense>

              {/* Tabs */}
              <div className="border-b border-gray-800">
                <div className="flex overflow-x-auto">
                  <button className="flex-1 py-4 text-center font-semibold text-blue-500 border-b-2 border-blue-500 whitespace-nowrap min-w-0">
                    Posts
                  </button>
                  <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                    Replies
                  </button>
                  <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                    Highlights
                  </button>
                  <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                    Articles
                  </button>
                  <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                    Media
                  </button>
                  <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                    Likes
                  </button>
                </div>
              </div>

              {/* Posts */}
              <Suspense fallback={<div className="p-4">Loading posts...</div>}>
                <ProfilePosts posts={posts} />
              </Suspense>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 ml-8 h-full overflow-y-auto">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-screen">
        {/* Mobile Header */}
        <MobileProfileHeader />

        {/* Mobile Main Content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Profile Banner */}
          <div className="relative h-32 bg-gradient-to-r from-gray-700 to-gray-900">
            {user.coverImageUrl ? (
              <img
                src={user.coverImageUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center border-4 border-black">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-white">
                    {user.displayName.charAt(0)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-4 pb-4">
            {/* Edit Profile Button */}
            <div className="flex justify-end mt-4">
              <button className="bg-gray-800 text-white font-bold px-4 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm">
                Follow
              </button>
            </div>

            {/* Profile Details */}
            <div className="mt-4">
              <h2 className="text-lg font-bold">{user.displayName}</h2>
              <p className="text-gray-500 text-sm">@{user.username}</p>

              {user.bio && (
                <p className="text-white text-sm mt-2">{user.bio}</p>
              )}

              <div className="flex items-center space-x-1 mt-3 text-gray-500">
                <span className="text-xs">
                  Joined{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-sm">
                    {followCounts.following}
                  </span>
                  <span className="text-gray-500 text-xs">Following</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-sm">
                    {followCounts.followers}
                  </span>
                  <span className="text-gray-500 text-xs">Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800">
            <div className="flex overflow-x-auto">
              <button className="flex-1 py-4 text-center font-semibold text-blue-500 border-b-2 border-blue-500 whitespace-nowrap min-w-0">
                Posts
              </button>
              <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                Replies
              </button>
              <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                Highlights
              </button>
              <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                Articles
              </button>
              <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                Media
              </button>
              <button className="flex-1 py-4 text-center font-semibold text-gray-500 hover:text-gray-300 transition-colors whitespace-nowrap min-w-0">
                Likes
              </button>
            </div>
          </div>

          {/* Posts */}
          <Suspense fallback={<div className="p-4">Loading posts...</div>}>
            <ProfilePosts posts={posts} />
          </Suspense>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
