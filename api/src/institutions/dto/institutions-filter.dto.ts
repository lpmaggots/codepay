import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class InstitutionsFilterDto {
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

  @ApiPropertyOptional({ description: 'Nome da instituição' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'Código da instituição' })
  @IsOptional()
  @IsString()
  code?: string

  @ApiPropertyOptional({ description: 'Tipo da instituição (ID)' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  typeId?: string
}