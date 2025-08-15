import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common'
import { TransactionTypesService } from './transaction-types.service'
import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto'
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard'

@ApiTags('transaction-types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transaction-types')
export class TransactionTypesController {
  constructor(private readonly service: TransactionTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction type' })
  create(@Body() dto: CreateTransactionTypeDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all transaction types' })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction type by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update transaction type by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateTransactionTypeDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete transaction type by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}
