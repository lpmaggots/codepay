import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma/prisma.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAccountDto) {
    return this.prisma.account.create({ data })
  }

  findAll() {
    return this.prisma.account.findMany({
      include: { transactions: true, user: true, institution: true },
    })
  }

  findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
      include: { transactions: true },
    })
  }

  update(id: string, data: UpdateAccountDto) {
    return this.prisma.account.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.account.delete({ where: { id } })
  }
}