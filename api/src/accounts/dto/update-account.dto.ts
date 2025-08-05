import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  number?: string

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsNumber()
  balance?: number
}
