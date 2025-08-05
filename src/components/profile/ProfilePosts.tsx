import Tweet from "@/components/post/Tweet";
import { PostWithUser } from "@/lib/types";

interface ProfilePostsProps {
  posts: PostWithUser[];
}

export default function ProfilePosts({ posts }: ProfilePostsProps) {
  return (
    <>
      {posts.map((post) => (
        <Tweet key={post.id} tweet={post} />
      ))}
    </>
  );
}
