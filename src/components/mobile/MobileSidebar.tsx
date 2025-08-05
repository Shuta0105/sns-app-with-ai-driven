"use client";

import {
  X,
  Home,
  Search,
  Bell,
  Mail,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const router = useRouter();

  const navItems = [
    {
      icon: Home,
      label: "ホーム",
      path: "/",
      active: true,
    },
    {
      icon: Search,
      label: "検索",
      path: "/search",
      active: false,
    },
    {
      icon: Bell,
      label: "通知",
      path: "/notifications",
      active: false,
    },
    {
      icon: Mail,
      label: "メッセージ",
      path: "/messages",
      active: false,
    },
    {
      icon: User,
      label: "プロフィール",
      path: "/profile",
      active: false,
    },
  ];

  const menuItems = [
    {
      icon: Settings,
      label: "設定とプライバシー",
      path: "/settings",
    },
    {
      icon: HelpCircle,
      label: "ヘルプセンター",
      path: "/help",
    },
  ];

  function handleNavClick(path: string) {
    router.push(path);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
      <div className="fixed left-0 top-0 h-full w-80 bg-black border-r border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">I</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center space-x-4 p-3 rounded-xl transition-colors ${
                  item.active
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="p-4 border-t border-gray-800">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="w-full flex items-center space-x-4 p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Icon className="w-6 h-6" />
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">I</span>
            </div>
            <div className="flex-1">
              <div className="font-bold text-white">Irish</div>
              <div className="text-sm text-gray-500">@aiueo1245474884</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
