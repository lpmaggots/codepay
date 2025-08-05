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

  findAll() {
    return this.prisma.institution.findMany({ include: { accounts: true } })
  }

  findOne(id: string) {
    return this.prisma.institution.findUnique({
      where: { id },
      include: { accounts: true },
    })
  }

  update(id: string, data: UpdateInstitutionDto) {
    return this.prisma.institution.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.institution.delete({ where: { id } })
  }
}