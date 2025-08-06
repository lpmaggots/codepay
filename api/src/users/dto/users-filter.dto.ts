import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class UsersFilterDto {
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
}
