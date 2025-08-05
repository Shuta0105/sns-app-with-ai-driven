import { notFound } from "next/navigation";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/sidebar/Sidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import Tweet from "@/components/post/Tweet";
import PostComposer from "@/components/post/PostComposer";
import { getPostById } from "@/lib/server-data";
import MobileNavigation from "@/components/mobile/MobileNavigation";

interface PostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  // ポスト詳細を取得
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

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
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="mr-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                  <div>
                    <h1 className="text-xl font-bold">Post</h1>
                  </div>
                </div>
                <div className="p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                  <MoreHorizontal className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-screen overflow-y-auto">
              {/* Main Post */}
              <Tweet tweet={post} />

              {/* Reply Composer */}
              <div className="border-b border-gray-800">
                <PostComposer
                  placeholder="Post your reply"
                  buttonText="Reply"
                />
              </div>

              {/* Replies */}
              {post.replies.length > 0 && (
                <div>
                  {post.replies.map((reply) => (
                    <Tweet key={reply.id} tweet={reply} />
                  ))}
                </div>
              )}

              {/* No Replies Message */}
              {post.replies.length === 0 && (
                <div className="border-t border-gray-800 p-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-semibold mb-2">No replies yet</p>
                    <p className="text-sm">
                      Be the first to reply to this post!
                    </p>
                  </div>
                </div>
              )}
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
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Link
                href="/"
                className="mr-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">Post</h1>
              </div>
            </div>
            <div className="p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
              <MoreHorizontal className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Mobile Main Content */}
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Main Post */}
          <Tweet tweet={post} />

          {/* Reply Composer */}
          <div className="border-b border-gray-800">
            <PostComposer placeholder="Post your reply" buttonText="Reply" />
          </div>

          {/* Replies */}
          {post.replies.length > 0 && (
            <div>
              {post.replies.map((reply) => (
                <Tweet key={reply.id} tweet={reply} />
              ))}
            </div>
          )}

          {/* No Replies Message */}
          {post.replies.length === 0 && (
            <div className="border-t border-gray-800 p-8 text-center">
              <div className="text-gray-500">
                <p className="text-lg font-semibold mb-2">No replies yet</p>
                <p className="text-sm">Be the first to reply to this post!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
