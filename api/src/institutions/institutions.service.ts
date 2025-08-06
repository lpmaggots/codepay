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
    this.logger.log('Checking if bank data needs to be seeded...')
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
    const banks = await this.bankApiService.getBanks() as Array<{
      name: string
      code: string | number | null | undefined
      ispb?: string
      fullName?: string
    }>;

    for (const bank of banks) {
      if (!bank.name || bank.code === null || bank.code === undefined) continue

      await this.prisma.institution.create({
        data: {
          name: bank.name,
          code: String(bank.code),
          logo: bank.ispb ?? bank.fullName ?? 'sem-logo',
        },
      })
    }
  }

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
    const where: any = {};

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