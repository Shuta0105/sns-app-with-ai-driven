"use client";

import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  Users,
  User,
  MoreHorizontal,
  Briefcase,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface SidebarProps {
  currentUser: {
    id: string;
    username: string;
    displayName: string;
    bio: string | null;
  } | null;
}

const navItems = [
  { icon: Home, label: "Home", active: true, path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Mail, label: "Messages", path: "/messages" },
  { icon: Zap, label: "Grok", path: "/grok" },
  { icon: Bookmark, label: "Bookmarks", path: "/bookmarks" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: Users, label: "Communities", path: "/communities" },
  { icon: CheckCircle, label: "Premium", path: "/premium" },
  { icon: CheckCircle, label: "Verified Orgs", path: "/verified-orgs" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: MoreHorizontal, label: "More", path: "/more" },
];

export default function Sidebar({ currentUser }: SidebarProps) {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const handleNavItemClick = (path: string) => {
    if (path === "/profile") {
      // 現在ログインしているユーザーのユーザー名でプロフィールページに遷移
      if (currentUser?.username) {
        router.push(`/profile/${currentUser.username}`);
      } else if (isLoaded && user?.username) {
        router.push(`/profile/${user.username}`);
      } else {
        router.push("/profile");
      }
    } else if (path === "/") {
      router.push("/");
    }
    // 他のページは後で実装
  };

  return (
    <div className="h-full p-4 flex flex-col">
      {/* X Logo */}
      <div className="mb-8 p-2">
        <div className="text-3xl font-bold">𝕏</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-full cursor-pointer ${
              item.active ? "font-bold" : ""
            }`}
            style={{ transition: "background-color 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#111827";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onClick={() => handleNavItemClick(item.path)}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xl">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Post Button */}
      <Button
        className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg mb-4"
        style={{ transition: "background-color 0.2s ease" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#2563eb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#3b82f6";
        }}
      >
        Post
      </Button>

      {/* User Profile */}
      <SignedIn>
        <div className="flex items-center space-x-3 p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
          <div className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-14 h-14",
                  userButtonTrigger: "w-14 h-14 rounded-full",
                  userButtonPopoverCard:
                    "bg-gray-900 border border-gray-700 shadow-lg",
                  userButtonPopoverActionButton:
                    "text-gray-300 hover:text-white hover:bg-gray-800",
                  userButtonPopoverActionButtonText:
                    "text-gray-300 hover:text-white",
                  userButtonPopoverFooter: "border-t border-gray-700",
                },
              }}
            />
          </div>
          <div className="flex-1">
            <div className="font-bold text-white">
              {currentUser?.displayName ||
                (isLoaded && user?.username ? user.username : "ユーザー")}
            </div>
            <div className="text-gray-500 text-sm">
              {currentUser?.username
                ? `@${currentUser.username}`
                : isLoaded && user?.emailAddresses[0]?.emailAddress
                ? `@${user.emailAddresses[0].emailAddress.split("@")[0]}`
                : "@user"}
            </div>
          </div>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </div>
      </SignedIn>

      <SignedOut>
        <div
          className="flex items-center space-x-3 p-3 rounded-full cursor-pointer"
          style={{ transition: "background-color 0.2s ease" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={() => router.push("/sign-in")}
        >
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">?</span>
          </div>
          <div className="flex-1">
            <div className="font-bold text-white">ログイン</div>
            <div className="text-gray-500 text-sm">アカウントにログイン</div>
          </div>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </div>
      </SignedOut>
    </div>
  );
}
