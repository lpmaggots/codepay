import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { AccountTypesService } from './account-types.service'
import { CreateAccountTypeDto } from './dto/create-account-type.dto'
import { UpdateAccountTypeDto } from './dto/update-account-type.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard'

@ApiTags('account-types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('account-types')
export class AccountTypesController {
  constructor(private readonly service: AccountTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account type' })
  create(@Body() dto: CreateAccountTypeDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all account types' })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account type by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update account type by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateAccountTypeDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account type by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}