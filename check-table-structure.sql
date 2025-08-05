-- テーブル構造を確認するSQLクエリ
-- SupabaseのSQLエディタで実行してください

-- usersテーブルの構造を確認
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- postsテーブルの構造を確認
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- followsテーブルの構造を確認
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'follows' 
ORDER BY ordinal_position;

-- likesテーブルの構造を確認
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'likes' 
ORDER BY ordinal_position; 