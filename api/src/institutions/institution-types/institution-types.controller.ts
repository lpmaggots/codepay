import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards
} from '@nestjs/common'
import { InstitutionTypesService } from './institution-types.service'
import { CreateInstitutionTypeDto } from './dto/create-institution-type.dto'
import { UpdateInstitutionTypeDto } from './dto/update-institution-type.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard'

@ApiTags('institution-types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('institution-types')
export class InstitutionTypesController {
  constructor(private readonly service: InstitutionTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new institution type' })
  create(@Body() dto: CreateInstitutionTypeDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all institution types' })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get institution type by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update institution type by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateInstitutionTypeDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete institution type by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}