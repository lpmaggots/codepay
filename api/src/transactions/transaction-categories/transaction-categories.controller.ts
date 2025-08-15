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
import { TransactionCategoriesService } from './transaction-categories.service'
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto'
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard'

@ApiTags('transaction-categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(private readonly service: TransactionCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction category' })
  create(@Body() dto: CreateTransactionCategoryDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all transaction categories' })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction category by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update transaction category by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateTransactionCategoryDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction category by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}