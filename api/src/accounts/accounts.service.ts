import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, data: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        ...data,
        userId,
      },
    })
  }

  async findAll(
    userId: string,
    query: {
    page?: number | string
    limit?: number | string
    orderBy?: string
    institutionId?: string
  }) {
    const page = Math.max(1, Number(query.page) || 1)
    const limit = Math.max(1, Number(query.limit) || 10)
    const orderBy = query.orderBy || 'createdAt'
    const institutionId = query.institutionId

    const where = { userId, ...(institutionId && { institutionId }) }

    const [accounts, total] = await Promise.all([
      this.prisma.account.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
        include: { institution: true },
      }),
      this.prisma.account.count({ where }),
    ])

    return {
      data: accounts,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: string, userId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id, userId },
      include: { institution: true },
    })
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`)
    }
    return account
  }

  async update(id: string, userId: string, data: UpdateAccountDto) {
    // Garante que o usuário só pode atualizar a própria conta
    await this.findOne(id, userId)
    return this.prisma.account.update({ where: { id }, data })
  }

  async remove(id: string, userId: string) {
    // Garante que o usuário só pode remover a própria conta
    await this.findOne(id, userId)
    await this.prisma.account.delete({ where: { id } })
    return { message: `Account with ID ${id} successfully removed.` }
  }
}
