import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateInstitutionTypeDto } from './dto/create-institution-type.dto'
import { UpdateInstitutionTypeDto } from './dto/update-institution-type.dto'

@Injectable()
export class InstitutionTypesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateInstitutionTypeDto) {
    return this.prisma.institutionType.create({ data: dto })
  }

  findAll() {
    return this.prisma.institutionType.findMany()
  }

  async findOne(id: string) {
    const item = await this.prisma.institutionType.findUnique({ where: { id } })
    if (!item) throw new NotFoundException(`Institution type with ID "${id}" not found`)
    return item
  }

  async update(id: string, dto: UpdateInstitutionTypeDto) {
    await this.findOne(id)
    return this.prisma.institutionType.update({ where: { id }, data: dto })
  }

  async remove(id: string) {
    await this.findOne(id)
    return this.prisma.institutionType.delete({ where: { id } })
  }
}
