import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateInstitutionDto } from './dto/create-institution.dto'
import { UpdateInstitutionDto } from './dto/update-institution.dto'

@Injectable()
export class InstitutionsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateInstitutionDto) {
    return this.prisma.institution.create({ data })
  }

  async findAll(query: {
    page?: number
    limit?: number
    orderBy?: string
    name?: string
    code?: string
  }) {
    const { page = 1, limit = 10, orderBy = 'createdAt', name, code } = query

    const where: any = {}

    if (name) where.name = { contains: name, mode: 'insensitive' }
    if (code) where.code = { contains: code, mode: 'insensitive' }

    const [institutions, total] = await Promise.all([
      this.prisma.institution.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
      }),
      this.prisma.institution.count({ where }),
    ])

    return {
      data: institutions,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    }
  }

  findOne(id: string) {
    return this.prisma.institution.findUnique({ where: { id } })
  }

  update(id: string, data: UpdateInstitutionDto) {
    return this.prisma.institution.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.institution.delete({ where: { id } })
  }
}
