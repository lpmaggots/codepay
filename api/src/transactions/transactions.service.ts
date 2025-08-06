import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateTransactionDto) {
    const { amount, accountId, type, description } = dto

    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    })

    if (!account) {
      throw new NotFoundException('Conta não encontrada')
    }

    if (account.userId !== userId) {
      throw new ForbiddenException('Você não tem acesso a essa conta')
    }

    if (amount <= 0) {
      throw new ForbiddenException('O valor da transação deve ser positivo')
    }

    if (type === 'DEBIT' && account.balance < amount) {
      throw new ForbiddenException('Saldo insuficiente')
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

  async findAll(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        account: {
          userId,
        },
      },
      orderBy: { date: 'desc' },
      include: { account: true },
    })
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: { account: true },
    })

    if (!transaction || transaction.account.userId !== userId) {
      throw new ForbiddenException('Transação não encontrada ou não autorizada')
    }

    return transaction;
  }

  async update(id: string, data: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data,
    })
  }

  async remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } })
  }
}