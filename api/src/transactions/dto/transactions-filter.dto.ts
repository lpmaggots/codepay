import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator'
import { Type } from 'class-transformer'

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class TransactionsFilterDto {
  @ApiPropertyOptional({ description: 'Número da página' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number

  @ApiPropertyOptional({ description: 'Limite de itens por página' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number

  @ApiPropertyOptional({ description: 'Data inicial para filtro (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  startDate?: string

  @ApiPropertyOptional({ description: 'Data final para filtro (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  endDate?: string

  @ApiPropertyOptional({ description: 'Tipo da transação', enum: TransactionType })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType
}
