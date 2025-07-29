import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@speedcube.com' },
    update: {},
    create: {
      email: 'demo@speedcube.com',
      username: 'demoUser',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  await prisma.solve.createMany({
    data: [
      {
        userId: user.id,
        time: 1523,
        penalty: '',
        scramble: 'R U R\' U R U2 R\'',
        createdAt: new Date(),
      },
      {
        userId: user.id,
        time: 1342,
        penalty: '+2',
        scramble: 'L F U2 R\' D R U R\'',
        createdAt: new Date(),
      },
    ],
  });

  console.log('✅ Database seeded');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
