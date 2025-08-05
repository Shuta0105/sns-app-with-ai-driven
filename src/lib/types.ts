export interface User {
  id: string;
  clerkId: string;
  email: string;
  username: string;
  displayName: string;
  bio?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentId?: string;
  user: User;
  likes: Like[];
  replies: Post[];
  _count?: {
    likes: number;
    replies: number;
  };
}

export interface Like {
  userId: string;
  postId: string;
  createdAt: Date;
}

export interface Follow {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface Trend {
  category: string;
  topic: string;
  posts: string;
}

export interface SuggestedUser {
  name: string;
  username: string;
  avatar: string;
  description?: string;
}

// Prismaの型と互換性を持つ型
export type PostWithUser = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentId: string | null;
  user: User;
  likes: Like[];
  replies: PostWithUser[];
  _count: {
    likes: number;
    replies: number;
  };
};
