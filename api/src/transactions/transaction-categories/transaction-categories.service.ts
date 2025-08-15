import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto'
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto'

@Injectable()
export class TransactionCategoriesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTransactionCategoryDto) {
    return this.prisma.transactionCategory.create({ data: dto })
  }

  findAll() {
    return this.prisma.transactionCategory.findMany()
  }

  async findOne(id: string) {
    const item = await this.prisma.transactionCategory.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Transaction category with ID "${id}" not found`)
    return item
  }

  async update(id: string, dto: UpdateTransactionCategoryDto) {
    await this.findOne(id)
    return this.prisma.transactionCategory.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.transactionCategory.delete({ where: { id } })
  }
}
