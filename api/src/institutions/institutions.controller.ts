import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common'
import { InstitutionsService } from './institutions.service'
import { CreateInstitutionDto } from './dto/create-institution.dto'
import { UpdateInstitutionDto } from './dto/update-institution.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('institutions')
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly service: InstitutionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new institution' })
  create(@Body() dto: CreateInstitutionDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List institutions with pagination and filters' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('orderBy') orderBy?: string,
    @Query('name') name?: string,
    @Query('code') code?: string,
  ) {
    return this.service.findAll({ page, limit, orderBy, name, code })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get institution by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update institution by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateInstitutionDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete institution by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}