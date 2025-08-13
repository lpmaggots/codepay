import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('123456', 10)
  const user = await prisma.user.create({
    data: {
      name: 'Felipe Falcone',
      email: 'felipe@example.com',
      password,
    },
  })

  const institution = await prisma.institution.create({
    data: {
      name: 'Banco CodePay',
      code: 'CODEPAY001',
      ispb: '123213',
    },
  })

  const account = await prisma.account.create({
    data: {
      number: '000123',
      type: 'CHECKING',
      balance: 1000,
      userId: user.id,
      institutionId: institution.id,
    },
  })

  await prisma.transaction.createMany({
    data: [
      {
        type: 'CREDIT',
        amount: 500,
        description: 'Depósito inicial',
        accountId: account.id,
      },
      {
        type: 'DEBIT',
        amount: 100,
        description: 'Pagamento de conta',
        accountId: account.id,
      },
    ],
  })
}

main()
  .then(() => {
    console.log('🌱 Seed executado com sucesso!')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
