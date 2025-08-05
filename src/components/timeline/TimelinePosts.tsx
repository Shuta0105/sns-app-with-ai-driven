import Tweet from "@/components/post/Tweet";
import { PostWithUser } from "@/lib/types";

interface TimelinePostsProps {
  posts: PostWithUser[];
}

export default function TimelinePosts({ posts }: TimelinePostsProps) {
  return (
    <>
      {posts.map((post) => (
        <Tweet key={post.id} tweet={post} />
      ))}
    </>
  );
}
