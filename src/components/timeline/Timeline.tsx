import { Suspense } from "react";
import PostComposer from "@/components/post/PostComposer";
import TimelineTabs from "@/components/timeline/TimelineTabs";
import TimelinePosts from "@/components/timeline/TimelinePosts";
import { PostWithUser } from "@/lib/types";

interface TimelineProps {
  posts: PostWithUser[];
}

export default function Timeline({ posts }: TimelineProps) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 z-10">
        <TimelineTabs />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Post Composer */}
        <Suspense fallback={<div className="p-4">Loading composer...</div>}>
          <PostComposer />
        </Suspense>

        {/* Tweets */}
        <Suspense fallback={<div className="p-4">Loading posts...</div>}>
          <TimelinePosts posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
