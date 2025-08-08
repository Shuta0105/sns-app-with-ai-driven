# Clerk Webhook 設定ガイド

このガイドでは、Clerk で認証時に Supabase のユーザーテーブルにデータを自動追加するための webhook 設定について説明します。

## 1. 環境変数の設定

`.env.local`ファイルに以下の環境変数を追加してください：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Clerk設定
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret_here
```

## 2. Supabase の設定

### Service Role Key の取得

1. Supabase ダッシュボードにログイン
2. プロジェクトの設定 → API
3. `service_role`キーをコピーして`SUPABASE_SERVICE_ROLE_KEY`に設定

### データベーステーブルの確認

`users`テーブルが以下の構造になっていることを確認してください：

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 3. Clerk の Webhook 設定

### Clerk ダッシュボードでの設定

1. [Clerk Dashboard](https://dashboard.clerk.com/)にログイン
2. プロジェクトを選択
3. 左サイドバーから「Webhooks」を選択
4. 「Add endpoint」をクリック
5. 以下の設定を行う：
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - **Events**: 以下のイベントを選択
     - `user.created`
     - `user.updated`
     - `user.deleted`
6. 「Create endpoint」をクリック
7. 作成された webhook の「Signing secret」をコピー
8. コピーしたシークレットを`CLERK_WEBHOOK_SECRET`に設定

### ローカル開発時の設定

ローカル開発時は、[ngrok](https://ngrok.com/)を使用して webhook をテストできます：

1. ngrok をインストール
2. 以下のコマンドでトンネルを作成：
   ```bash
   ngrok http 3000
   ```
3. 表示された URL（例：`https://abc123.ngrok.io`）を Clerk の webhook URL に設定：
   ```
   https://abc123.ngrok.io/api/webhooks/clerk
   ```

## 4. Webhook の動作確認

### テスト手順

1. アプリケーションを起動
2. 新しいユーザーでサインアップ
3. Supabase ダッシュボードで`users`テーブルを確認
4. 新しいユーザーレコードが作成されていることを確認

### ログの確認

webhook の動作は、アプリケーションのログで確認できます：

```bash
npm run dev
```

## 5. トラブルシューティング

### よくある問題

1. **Webhook が呼ばれない**

   - URL が正しいか確認
   - ngrok が起動しているか確認
   - Clerk の webhook 設定でイベントが正しく選択されているか確認

2. **Supabase への挿入エラー**

   - `SUPABASE_SERVICE_ROLE_KEY`が正しく設定されているか確認
   - データベースのテーブル構造が正しいか確認
   - RLS（Row Level Security）が無効になっているか確認

3. **署名検証エラー**
   - `CLERK_WEBHOOK_SECRET`が正しく設定されているか確認
   - webhook のシークレットが最新のものか確認

### デバッグ方法

webhook のデバッグは、以下の方法で行えます：

1. **ログの確認**: アプリケーションのコンソールログを確認
2. **Clerk Dashboard**: Webhooks ページで webhook の送信履歴を確認
3. **Supabase Logs**: Supabase ダッシュボードでクエリログを確認

## 6. セキュリティ考慮事項

- `SUPABASE_SERVICE_ROLE_KEY`は非常に強力な権限を持つため、適切に管理してください
- webhook のシークレットは絶対に公開しないでください
- 本番環境では、適切な HTTPS エンドポイントを使用してください
