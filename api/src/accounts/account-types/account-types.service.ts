import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateAccountTypeDto } from './dto/create-account-type.dto'
import { UpdateAccountTypeDto } from './dto/update-account-type.dto'

@Injectable()
export class AccountTypesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAccountTypeDto) {
    return this.prisma.accountType.create({ data: dto })
  }

  findAll() {
    return this.prisma.accountType.findMany()
  }

  async findOne(id: string) {
    const item = await this.prisma.accountType.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Account type with ID "${id}" not found`)
    return item
  }

  async update(id: string, dto: UpdateAccountTypeDto) {
    await this.findOne(id)
    return this.prisma.accountType.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.accountType.delete({ where: { id } })
  }
}