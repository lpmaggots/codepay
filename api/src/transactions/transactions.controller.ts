import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/src/auth/jwt/jwt-auth.guard'

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  @ApiOperation({ summary: 'List all transactions for the user' })
  findAll(@Request() req) {
    const userId = req.user.sub
    return this.service.findAll(userId)
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