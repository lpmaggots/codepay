import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateAccountDto) {
    return this.prisma.account.create({ data })
  }

  async findAll(query: {
    page?: number
    limit?: number
    orderBy?: string
    institutionId?: string
  }) {
    const { page = 1, limit = 10, orderBy = 'createdAt', institutionId } = query

    const where = institutionId ? { institutionId } : {}

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

  findOne(id: string) {
    return this.prisma.account.findUnique({ where: { id }, include: { institution: true } })
  }

  update(id: string, data: UpdateAccountDto) {
    return this.prisma.account.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.account.delete({ where: { id } })
  }
}
