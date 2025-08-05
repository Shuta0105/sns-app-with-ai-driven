"use client";

import { Home, Search, Bell, Mail, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function MobileNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      icon: Home,
      label: "ホーム",
      path: "/",
      active: pathname === "/",
    },
    {
      icon: Search,
      label: "検索",
      path: "/search",
      active: pathname === "/search",
    },
    {
      icon: Bell,
      label: "通知",
      path: "/notifications",
      active: pathname === "/notifications",
    },
    {
      icon: Mail,
      label: "メッセージ",
      path: "/messages",
      active: pathname === "/messages",
    },
    {
      icon: User,
      label: "プロフィール",
      path: "/profile",
      active: pathname === "/profile",
    },
  ];

  function handleNavClick(path: string) {
    router.push(path);
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                item.active ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon
                className={`h-6 w-6 ${
                  item.active ? "text-white" : "text-gray-500"
                }`}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
