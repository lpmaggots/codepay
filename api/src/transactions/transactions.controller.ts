import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { TransactionsFilterDto } from './dto/transactions-filter.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/src/auth/jwt/jwt-auth.guard'

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  create(@Request() req, @Body() dto: CreateTransactionDto) {
    const userId = req.user.sub
    return this.service.create(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'List transactions with pagination and filters' })
  findAll(@Request() req, @Query() filters: TransactionsFilterDto) {
    const userId = req.user.sub
    return this.service.findAll({ userId, ...filters })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub
    return this.service.findOne(userId, id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update transaction by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}