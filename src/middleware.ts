import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// パブリックルートの定義
const PUBLIC_ROUTES = [
  "/", // ホームページ
  "/sign-in(.*)", // ログインページ（すべてのサブルートを含む）
  "/sign-up(.*)", // 新規登録ページ（すべてのサブルートを含む）
  "/api/webhooks/clerk", // Clerk webhook
];

// パブリックルートのマッチャーを作成
const isPublicRoute = createRouteMatcher(PUBLIC_ROUTES);

// Clerkミドルウェアの設定
export default clerkMiddleware(async (auth, req) => {
  // パブリックルートでない場合は認証を要求
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// Next.jsミドルウェアの設定
export const config = {
  matcher: [
    // Next.jsの内部ファイルと静的ファイルをスキップ
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // APIルートは常に実行
    "/(api|trpc)(.*)",
  ],
};
