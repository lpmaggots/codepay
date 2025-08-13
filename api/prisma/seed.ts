import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // =======================
  // InstitutionType
  // =======================
  const institutionTypes = [
    { description: 'Banco' },
    { description: 'Cooperativa de Crédito' },
    { description: 'Corretora de Investimentos' }
  ]

  for (const type of institutionTypes) {
    await prisma.institutionType.create({
      data: type,
    })
  }

  // =======================
  // AccountType
  // =======================
  const accountTypes = [
    { description: 'Conta Corrente' },
    { description: 'Conta Poupança' },
    { description: 'Cartão de Crédito' },
    { description: 'Investimento' },
    { description: 'Dinheiro Físico' }
  ]

  for (const type of accountTypes) {
    await prisma.accountType.create({
      data: type,
    })
  }

  // =======================
  // TransactionType
  // =======================
  const transactionTypes = [
    { description: 'Receita' },
    { description: 'Despesa' },
  ]

  for (const type of transactionTypes) {
    await prisma.transactionType.create({
      data: type,
    })
  }

  // =======================
  // TransactionCategory
  // =======================
  const transactionCategories = [
    { description: 'Alimentação' },
    { description: 'Transporte' },
    { description: 'Moradia' },
    { description: 'Salário' },
    { description: 'Investimento' },
  ]

  for (const category of transactionCategories) {
    await prisma.transactionCategory.create({
      data: category,
    })
  }

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
