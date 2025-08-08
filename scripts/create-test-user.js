const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // テストユーザーを作成
    const testUser = await prisma.user.upsert({
      where: { username: 'testuser' },
      update: {},
      create: {
        clerkId: 'test-clerk-id',
        email: 'testuser@example.com',
        username: 'testuser',
        displayName: 'Test User',
        bio: 'This is a test user for development.',
      },
    });

    console.log('Test user created:', testUser);

    // テスト投稿も作成
    const testPost = await prisma.post.create({
      data: {
        content: 'This is a test post from testuser!',
        userId: testUser.id,
      },
    });

    console.log('Test post created:', testPost);

  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 