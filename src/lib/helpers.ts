import { Post, PostWithUser } from "./types";

export function formatNumber(num: number | string): string {
  if (typeof num === "string") {
    return num;
  }

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toString();
}

export function getPostCount(posts: Post[] | PostWithUser[]): string {
  const count = posts.length;
  return `${count} post${count !== 1 ? "s" : ""}`;
}

export function createHoverHandler(
  element: HTMLElement,
  color: string,
  backgroundColor?: string
) {
  return {
    onMouseEnter: () => {
      element.style.color = color;
      if (backgroundColor) {
        element.style.backgroundColor = backgroundColor;
      }
    },
    onMouseLeave: () => {
      element.style.color = "#6b7280";
      if (backgroundColor) {
        element.style.backgroundColor = "transparent";
      }
    },
  };
}
