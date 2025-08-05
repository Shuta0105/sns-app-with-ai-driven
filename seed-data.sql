-- SNSアプリケーション用のseedデータ
-- SupabaseのSQLエディタで実行してください

-- ユーザーデータの挿入
INSERT INTO users (id, clerk_id, email, username, display_name, bio, profile_image_url, cover_image_url, created_at, updated_at) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  'user_2abc123def456',
  'alice@example.com',
  'alice_dev',
  'Alice Johnson',
  'フルスタック開発者 | React & TypeScript愛好家 | コーヒー中毒者 ☕',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop',
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'user_2def456ghi789',
  'bob@example.com',
  'bob_tech',
  'Bob Smith',
  'AI/MLエンジニア | 機械学習とデータサイエンス | ランニングが趣味 🏃‍♂️',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=200&fit=crop',
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'user_2ghi789jkl012',
  'carol@example.com',
  'carol_design',
  'Carol Wilson',
  'UI/UXデザイナー | 美しいインターフェースを作るのが好き | アートギャラリー巡り 🎨',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=200&fit=crop',
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'user_2jkl012mno345',
  'david@example.com',
  'david_startup',
  'David Chen',
  'スタートアップ創業者 | イノベーションを追求 | テニスプレイヤー 🎾',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=200&fit=crop',
  NOW(),
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'user_2mno345pqr678',
  'emma@example.com',
  'emma_writer',
  'Emma Davis',
  'テックライター | 技術記事を書くのが好き | 読書と旅行 📚✈️',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=200&fit=crop',
  NOW(),
  NOW()
);

-- 投稿データの挿入
INSERT INTO posts (id, content, user_id, created_at, updated_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440001',
  '今日は新しいReactプロジェクトを始めました！TypeScriptとTailwind CSSを使ったモダンな開発が楽しいです 🚀 #React #TypeScript #WebDev',
  '550e8400-e29b-41d4-a716-446655440001',
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '2 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  '機械学習モデルの精度が95%を超えました！データの前処理が本当に重要だと実感しています 📊 #MachineLearning #DataScience',
  '550e8400-e29b-41d4-a716-446655440002',
  NOW() - INTERVAL '4 hours',
  NOW() - INTERVAL '4 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440003',
  '新しいデザインシステムを構築中です。アクセシビリティとユーザビリティを重視したUIを作るのが楽しいです 🎨 #UX #Design',
  '550e8400-e29b-41d4-a716-446655440003',
  NOW() - INTERVAL '6 hours',
  NOW() - INTERVAL '6 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440004',
  'スタートアップのピッチデッキを完成させました！投資家とのミーティングが楽しみです 💼 #Startup #Entrepreneurship',
  '550e8400-e29b-41d4-a716-446655440004',
  NOW() - INTERVAL '8 hours',
  NOW() - INTERVAL '8 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440005',
  'Next.js 14の新機能について記事を書きました。App RouterとServer Componentsの組み合わせが素晴らしいです 📝 #NextJS #WebDevelopment',
  '550e8400-e29b-41d4-a716-446655440005',
  NOW() - INTERVAL '10 hours',
  NOW() - INTERVAL '10 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440006',
  '今日のコーディングセッションで、PrismaとSupabaseの組み合わせが最高だと実感しました！開発効率が格段に上がります 💻 #Prisma #Supabase',
  '550e8400-e29b-41d4-a716-446655440001',
  NOW() - INTERVAL '12 hours',
  NOW() - INTERVAL '12 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440007',
  'AIチャットボットの実装が完了しました。自然言語処理の進歩に驚いています 🤖 #AI #NLP',
  '550e8400-e29b-41d4-a716-446655440002',
  NOW() - INTERVAL '14 hours',
  NOW() - INTERVAL '14 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440008',
  'モバイルファーストのデザイン原則について勉強中です。レスポンシブデザインの重要性を再認識しました 📱 #MobileFirst #ResponsiveDesign',
  '550e8400-e29b-41d4-a716-446655440003',
  NOW() - INTERVAL '16 hours',
  NOW() - INTERVAL '16 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440009',
  '新しいプロダクトのMVPが完成しました！ユーザーフィードバックを待ちきれません 🎉 #MVP #ProductDevelopment',
  '550e8400-e29b-41d4-a716-446655440004',
  NOW() - INTERVAL '18 hours',
  NOW() - INTERVAL '18 hours'
),
(
  '660e8400-e29b-41d4-a716-446655440010',
  'TypeScriptの型安全性について記事を書きました。開発時のバグを大幅に減らせます 📚 #TypeScript #Programming',
  '550e8400-e29b-41d4-a716-446655440005',
  NOW() - INTERVAL '20 hours',
  NOW() - INTERVAL '20 hours'
);

-- 返信投稿の挿入
INSERT INTO posts (id, content, user_id, parent_id, created_at, updated_at) VALUES
(
  '660e8400-e29b-41d4-a716-446655440011',
  '素晴らしいですね！TypeScriptとTailwindの組み合わせは本当に効率的です 👍',
  '550e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440001',
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '1 hour'
),
(
  '660e8400-e29b-41d4-a716-446655440012',
  '私も最近TypeScriptを始めました！学習曲線はありますが、型安全性が素晴らしいです',
  '550e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440001',
  NOW() - INTERVAL '30 minutes',
  NOW() - INTERVAL '30 minutes'
),
(
  '660e8400-e29b-41d4-a716-446655440013',
  '95%の精度は素晴らしいですね！どのようなデータセットを使われましたか？',
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440002',
  NOW() - INTERVAL '3 hours',
  NOW() - INTERVAL '3 hours'
);

-- フォロー関係の挿入
INSERT INTO follows (follower_id, following_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '1 day');

-- いいねデータの挿入
INSERT INTO likes (user_id, post_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '1 hour'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '45 minutes'),
('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '30 minutes'),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '15 minutes'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '3 hours'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '2 hours'),
('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '1 hour'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '5 hours'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '4 hours'),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440003', NOW() - INTERVAL '3 hours'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '7 hours'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '6 hours'),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '5 hours'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '9 hours'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '8 hours'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '7 hours'),
('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '6 hours'),
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '30 minutes'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '20 minutes'),
('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440011', NOW() - INTERVAL '10 minutes');

-- データ挿入完了メッセージ
SELECT 'Seed data has been successfully inserted!' as message; 