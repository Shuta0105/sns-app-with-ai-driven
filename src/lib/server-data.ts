import { prisma } from "@/lib/prisma";
import { PostWithUser, User, Trend, SuggestedUser } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    return user as User | null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function getCurrentUserLikes(
  postIds: string[]
): Promise<Set<string>> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Set();
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return new Set();
    }

    const likes = await prisma.like.findMany({
      where: {
        userId: user.id,
        postId: {
          in: postIds,
        },
      },
      select: {
        postId: true,
      },
    });

    return new Set(likes.map((like) => like.postId));
  } catch (error) {
    console.error("Error fetching current user likes:", error);
    return new Set();
  }
}

export async function getPosts(): Promise<PostWithUser[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        parentId: null, // 返信でない投稿のみを取得
      },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts as PostWithUser[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user as User | null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserPosts(username: string): Promise<PostWithUser[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
        parentId: null, // 返信でない投稿のみを取得
      },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts as PostWithUser[];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
}

export async function getProfilePosts(): Promise<PostWithUser[]> {
  try {
    // 特定のユーザーの投稿を取得（例：Alice Johnsonの投稿）
    const posts = await prisma.post.findMany({
      where: {
        userId: "550e8400-e29b-41d4-a716-446655440001", // Alice JohnsonのID
        parentId: null, // 返信でない投稿のみを取得
      },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts as PostWithUser[];
  } catch (error) {
    console.error("Error fetching profile posts:", error);
    return [];
  }
}

export async function getPostById(id: string): Promise<PostWithUser | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        likes: true,
        replies: {
          include: {
            user: true,
            _count: {
              select: {
                likes: true,
                replies: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });

    return post as PostWithUser | null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getTrends(): Promise<Trend[]> {
  return [
    { category: "Music · Trending", topic: "今市隆二", posts: "5,512 posts" },
    {
      category: "Technology · Trending",
      topic: "ChatGPT",
      posts: "12.3K posts",
    },
    { category: "Sports · Trending", topic: "サッカー", posts: "8,901 posts" },
    {
      category: "Entertainment · Trending",
      topic: "映画",
      posts: "3,456 posts",
    },
    { category: "Politics · Trending", topic: "選挙", posts: "2,789 posts" },
  ];
}

export async function getFollowCounts(
  userId: string
): Promise<{ followers: number; following: number }> {
  try {
    const [followersCount, followingCount] = await Promise.all([
      prisma.follow.count({
        where: {
          followingId: userId,
        },
      }),
      prisma.follow.count({
        where: {
          followerId: userId,
        },
      }),
    ]);

    return {
      followers: followersCount,
      following: followingCount,
    };
  } catch (error) {
    console.error("Error fetching follow counts:", error);
    return {
      followers: 0,
      following: 0,
    };
  }
}

export async function getSuggestedUsers(): Promise<SuggestedUser[]> {
  return [
    {
      name: "田中太郎",
      username: "tanaka_taro",
      avatar: "TT",
      description: "フルスタック開発者",
    },
    {
      name: "佐藤花子",
      username: "sato_hanako",
      avatar: "SH",
      description: "UI/UXデザイナー",
    },
    {
      name: "山田次郎",
      username: "yamada_jiro",
      avatar: "YJ",
      description: "データサイエンティスト",
    },
  ];
}
