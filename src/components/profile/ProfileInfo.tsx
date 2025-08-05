import { Calendar } from "lucide-react";
import { User } from "@/lib/types";

interface ProfileInfoProps {
  user: User;
  followCounts: {
    followers: number;
    following: number;
  };
}

export default function ProfileInfo({ user, followCounts }: ProfileInfoProps) {
  return (
    <div className="relative px-4 pb-4">
      {/* Avatar */}
      <div className="absolute -top-8 sm:-top-16 left-4">
        <div className="w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center border-4 border-black">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={user.displayName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xl sm:text-4xl font-bold text-white">
              {user.displayName.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-gray-800 text-white font-bold px-4 sm:px-6 py-2 rounded-full hover:bg-gray-700 transition-colors text-sm sm:text-base">
          Follow
        </button>
      </div>

      {/* Profile Details */}
      <div className="mt-4">
        <h2 className="text-lg sm:text-xl font-bold">{user.displayName}</h2>
        <p className="text-gray-500 text-sm sm:text-base">@{user.username}</p>

        {user.bio && (
          <p className="text-white text-sm sm:text-base mt-2">{user.bio}</p>
        )}

        <div className="flex items-center space-x-1 mt-3 text-gray-500">
          <Calendar className="h-4 w-4" />
          <span className="text-xs sm:text-sm">
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 mt-4">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-sm sm:text-base">
              {followCounts.following}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">Following</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold text-sm sm:text-base">
              {followCounts.followers}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
