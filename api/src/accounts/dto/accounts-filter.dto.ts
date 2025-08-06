import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNumber, IsString, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class AccountsFilterDto {
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

  @ApiPropertyOptional({ description: 'Campo para ordenação' })
  @IsOptional()
  @IsString()
  orderBy?: string

  @ApiPropertyOptional({ description: 'ID da instituição' })
  @IsOptional()
  @IsUUID()
  institutionId?: string
}