import Tweet from "@/components/post/Tweet";
import { PostWithUser } from "@/lib/types";
import { getCurrentUserLikes } from "@/lib/server-data";

interface TimelinePostsProps {
  posts: PostWithUser[];
}

export default async function TimelinePosts({ posts }: TimelinePostsProps) {
  // 現在のユーザーのいいね状態を取得
  const postIds = posts.map((post) => post.id);
  const userLikes = await getCurrentUserLikes(postIds);

  return (
    <>
      {posts.map((post) => (
        <Tweet
          key={post.id}
          tweet={post}
          initialLiked={userLikes.has(post.id)}
        />
      ))}
    </>
  );
}
