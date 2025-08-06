import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

interface FindAllQuery {
  page?: number
  limit?: number
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({ data })
  }

  async findAll(query: FindAllQuery) {
    const { page = 1, limit = 10 } = query

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { accounts: true },
      }),
      this.prisma.user.count(),
    ])

    return {
      data: users,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    }
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    })
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}