import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTransactionDto) {
    return this.prisma.transaction.create({ data })
  }

  findAll() {
    return this.prisma.transaction.findMany({ include: { account: true } })
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: { account: true },
    })
  }

  update(id: string, data: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.transaction.delete({ where: { id } })
  }
}