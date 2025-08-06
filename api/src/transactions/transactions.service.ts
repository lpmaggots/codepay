import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

interface FindAllQuery {
  userId: string
  page?: number
  limit?: number
  startDate?: string
  endDate?: string
  type?: string
}

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const { amount, accountId, type, description } = dto

    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    })

    if (!account) {
      throw new NotFoundException('Account not found')
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('You do not have access to this account')
    }

    if (amount <= 0) {
      throw new ForbiddenException('Transaction amount must be positive')
    }

    if (type === 'DEBIT' && account.balance < amount) {
      throw new ForbiddenException('Insufficient balance')
    }

    const updatedBalance =
      type === 'DEBIT' ? account.balance - amount : account.balance + amount

    await this.prisma.account.update({
      where: { id: accountId },
      data: { balance: updatedBalance },
    })

    return this.prisma.transaction.create({
      data: {
        amount,
        type,
        description,
        accountId,
      },
    })
  }

  async findAll(query: FindAllQuery) {
    const {
      userId,
      page = 1,
      limit = 10,
      startDate,
      endDate,
      type,
    } = query

    const filters: any = {
      account: {
        userId,
      },
    }

    if (type) {
      filters.type = type.toUpperCase()
    }

    if (startDate || endDate) {
      filters.date = {}
      if (startDate) {
        filters.date.gte = new Date(startDate)
      }
      if (endDate) {
        filters.date.lte = new Date(endDate)
      }
    }

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: filters,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { date: 'desc' },
        include: { account: true },
      }),
      this.prisma.transaction.count({ where: filters }),
    ])

    return {
      data: transactions,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    }
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { account: true },
    })

    if (!transaction || transaction.account.userId !== userId) {
      throw new ForbiddenException('Transaction not found or not authorized')
    }

    return transaction
  }

  update(id: string, data: UpdateTransactionDto) {
    return this.prisma.transaction.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } })
  }
}
