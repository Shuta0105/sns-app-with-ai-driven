"use client";

import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { User as UserType } from "@/lib/types";
import { updateProfile } from "@/lib/actions/users";

interface EditProfileModalProps {
  user: UserType;
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    bio: user.bio || "",
    coverImageUrl: user.coverImageUrl || "",
    profileImageUrl: user.profileImageUrl || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(
    user.coverImageUrl || ""
  );
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfile({
        ...formData,
        username: user.username, // 既存のusernameを使用
        coverImageFile: coverImageFile || undefined,
        profileImageFile: undefined,
      });

      if (result.success) {
        // 成功時は更新後のプロフィールページに遷移
        window.location.href = `/profile/${user.username}`;
      } else {
        console.error("プロフィール更新に失敗しました:", result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      alert("プロフィールの更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ファイルサイズチェック（5MB以下）
      if (file.size > 5 * 1024 * 1024) {
        alert("ファイルサイズは5MB以下にしてください");
        return;
      }

      // ファイル形式チェック
      if (!file.type.startsWith("image/")) {
        alert("画像ファイルを選択してください");
        return;
      }

      setCoverImageFile(file);

      // プレビュー用のURLを作成
      const imageUrl = URL.createObjectURL(file);
      setCoverImagePreview(imageUrl);
    }
  };

  const removeCoverImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview("");
    setFormData({ ...formData, coverImageUrl: "" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-md mx-4 relative shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Edit profile</h2>
          <button
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cover Image
            </label>
            <div className="relative">
              {coverImagePreview ? (
                <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={coverImagePreview}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">No cover image</p>
                  </div>
                </div>
              )}
              <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                <Upload className="h-4 w-4 mr-2" />
                {coverImagePreview
                  ? "Change Cover Image"
                  : "Upload Cover Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-400 mt-1">
                JPG, PNG, GIF up to 5MB
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              maxLength={160}
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-white hover:bg-gray-800 rounded-full transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
