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

export default function Sidebar() {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleNavItemClick = (path: string) => {
    if (path === "/profile") {
      router.push("/profile");
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
      <div
        className="flex items-center space-x-3 p-3 rounded-full cursor-pointer"
        style={{ transition: "background-color 0.2s ease" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#111827";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        onClick={handleProfileClick}
      >
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">I</span>
        </div>
        <div className="flex-1">
          <div className="font-bold">Irish</div>
          <div className="text-gray-500 text-sm">@ajueo1245474884</div>
        </div>
        <MoreHorizontal className="h-5 w-5" />
      </div>
    </div>
  );
}
