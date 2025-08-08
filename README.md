# SNS with AI-Driven

AI 駆動の SNS アプリケーションです。Next.js、TypeScript、Prisma、Supabase を使用して構築されています。

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Shadcn UI, Radix UI
- **データベース**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **認証**: Clerk

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`env.example`ファイルをコピーして`.env.local`ファイルを作成し、必要な環境変数を設定してください：

```bash
cp env.example .env.local
```

以下の環境変数を設定してください：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# データベース設定
DATABASE_URL=your_database_url_here

# Clerk設定
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 3. データベースのセットアップ

Prisma クライアントを生成し、データベースにマイグレーションを適用します：

```bash
# Prismaクライアントの生成
npm run db:generate

# データベースへのプッシュ（開発環境）
npm run db:push

# または、マイグレーションを使用する場合
npm run db:migrate
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## データベーススキーマ

このアプリケーションでは以下のモデルが定義されています：

- **User**: ユーザー情報（メール、ユーザー名、プロフィール等）
- **Post**: 投稿内容
- **Like**: いいね機能
- **Follows**: フォロー機能

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - ESLint によるコードチェック
- `npm run db:generate` - Prisma クライアントの生成
- `npm run db:push` - データベーススキーマのプッシュ
- `npm run db:migrate` - データベースマイグレーション
- `npm run db:studio` - Prisma Studio の起動

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# sns-app-with-ai-driven
