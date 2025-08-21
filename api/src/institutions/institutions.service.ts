import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateInstitutionDto } from './dto/create-institution.dto'
import { UpdateInstitutionDto } from './dto/update-institution.dto'
import { BankApiService } from './bank-api.service'

@Injectable()
export class InstitutionsService implements OnModuleInit {
  private readonly logger = new Logger(InstitutionsService.name)

  constructor(
    private prisma: PrismaService,
    private bankApiService: BankApiService,
  ) {}

  async onModuleInit() {
    const count = await this.prisma.institution.count()
    if (count === 0) {
      this.logger.log('No banks found. Seeding data from the API...')
      await this.seedInstitutions()
      this.logger.log('Banks successfully seeded!')
    } else {
      this.logger.log(`${count} banks already registered. No action needed.`)
    }
  }

  async seedInstitutions() {
    const bankType = await this.prisma.institutionType.findFirst({
      where: { description: 'Banco' },
    })
    if (!bankType) throw new Error('InstitutionType "Banco" not found.')

    const banks = (await this.bankApiService.getBanks()) as Array<{
      name: string
      code: string | number | null | undefined
      ispb?: string
      fullName?: string
    }>

    for (const bank of banks) {
      if (!bank.name || bank.code == null) continue
      await this.prisma.institution.create({
        data: {
          name: bank.name,
          code: String(bank.code),
          ispb: bank.ispb ?? '',
          type: { connect: { id: bankType.id } },
        },
        include: { type: true },
      })
    }
  }

  create(data: CreateInstitutionDto) {
    return this.prisma.institution.create({ data })
  }

  async findAll(query: {
    page?: string | number
    limit?: string | number
    orderBy?: string
    name?: string
    code?: string
    typeId?: string
  }) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const orderBy = query.orderBy || 'createdAt'
    const { name, code, typeId } = query

    const where: any = {}

    if (name) {
      where.name = { contains: name }
    }

    if (code) {
      where.code = { contains: code }
    }

    if (typeId) {
      where.typeId = typeId
    }

    const [institutions, total] = await Promise.all([
      this.prisma.institution.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [orderBy]: 'desc' },
        include: { type: true },
      }),
      this.prisma.institution.count({ where }),
    ])

    return {
      data: institutions,
      meta: {
        count: total,
        currentPage: page,
        perPage: limit,
        pageCount: Math.ceil(total / limit),
        nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null,
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