"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Image as ImageIcon,
  Smile,
  Calendar,
  MapPin,
  BarChart3,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useAuth, SignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { createPost, createReply } from "@/lib/actions/posts";

interface PostComposerProps {
  placeholder?: string;
  buttonText?: string;
  parentId?: string; // 返信先の投稿ID
  onReplySuccess?: () => void; // 返信成功時のコールバック
}

export default function PostComposer({
  placeholder = "What's happening?",
  buttonText = "Post",
  parentId,
  onReplySuccess,
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handlePostClick = async () => {
    if (!isSignedIn) {
      setShowSignInModal(true);
      return;
    }

    if (!content.trim()) {
      setError("投稿内容を入力してください");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let result;

      if (parentId) {
        // 返信投稿の場合
        result = await createReply(content, parentId);
      } else {
        // 通常の投稿の場合
        result = await createPost(content);
      }

      if (result.success) {
        setContent("");
        setError(null);

        // 返信成功時のコールバックを実行
        if (parentId && onReplySuccess) {
          onReplySuccess();
        }
      } else {
        setError(result.error || "投稿に失敗しました");
      }
    } catch (error) {
      setError("投稿中にエラーが発生しました");
      console.error("投稿エラー:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="border-b border-gray-800 p-4">
        <div className="flex space-x-3">
          {/* Avatar */}
          <SignedIn>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity overflow-hidden">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName || "ユーザー"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {user?.fullName?.[0] || "U"}
                  </span>
                )}
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">?</span>
              </div>
            </div>
          </SignedOut>

          {/* Content */}
          <div className="flex-1">
            <SignedIn>
              <Textarea
                placeholder={placeholder}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setError(null); // エラーをクリア
                }}
                className="bg-transparent border-0 text-xl placeholder-gray-500 resize-none focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 p-0 shadow-none"
                rows={3}
                disabled={isSubmitting}
              />
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </SignedIn>

            <SignedOut>
              <Textarea
                placeholder="ログインして投稿を開始"
                value=""
                disabled
                className="bg-transparent border-0 text-xl placeholder-gray-500 resize-none focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:border-0 p-0 shadow-none opacity-50"
                rows={3}
              />
            </SignedOut>

            {/* Icons */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <ImageIcon
                  className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                  size={28}
                />
                <BarChart3
                  className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                  size={28}
                />
                <Smile
                  className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                  size={28}
                />
                <Calendar
                  className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                  size={28}
                />
                <MapPin
                  className="h-5 w-5 text-blue-500 cursor-pointer hover:bg-blue-500/10 p-1 rounded-full transition-colors"
                  size={28}
                />
              </div>

              <div className="flex items-center space-x-3">
                <SignedIn>
                  <div className="flex items-center space-x-2 text-blue-500">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      Everyone can reply
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${
                        content.length > 260
                          ? "text-red-500"
                          : content.length > 220
                          ? "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    >
                      {280 - content.length}
                    </span>
                    <Button
                      onClick={handlePostClick}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-1.5 rounded-full disabled:opacity-50"
                      disabled={
                        content.trim().length === 0 ||
                        isSubmitting ||
                        content.length > 280
                      }
                    >
                      {isSubmitting ? "投稿中..." : buttonText}
                    </Button>
                  </div>
                </SignedIn>

                <SignedOut>
                  <Button
                    onClick={() => setShowSignInModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-1.5 rounded-full"
                  >
                    ログインして投稿
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ログインが必要です
              </h3>
              <p className="text-sm text-gray-600">
                投稿するにはログインしてください
              </p>
            </div>

            <div className="mb-4">
              <SignIn
                routing="hash"
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full",
                    card: "shadow-none p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton:
                      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors w-full",
                    formFieldInput:
                      "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                    formFieldLabel: "block text-sm font-medium text-gray-700",
                    footerActionLink: "text-blue-600 hover:text-blue-500",
                  },
                }}
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowSignInModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
