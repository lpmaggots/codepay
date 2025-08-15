import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto'
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto'

@Injectable()
export class TransactionTypesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTransactionTypeDto) {
    return this.prisma.transactionType.create({ data: dto })
  }

  findAll() {
    return this.prisma.transactionType.findMany()
  }

  async findOne(id: string) {
    const item = await this.prisma.transactionType.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Transaction type with ID "${id}" not found`)
    return item
  }

  async update(id: string, dto: UpdateTransactionTypeDto) {
    await this.findOne(id)
    return this.prisma.transactionType.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.transactionType.delete({ where: { id } })
  }
}
