// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      password: '$2y$10$VNRRLz4NpGyEybiGtiK4MOq9/M2Vyvk1oWAOh3/tbWWxdkl07b93W', //Admin123!
    },
  })

  console.log('Admin added!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
