import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsNumber()
  amount?: number

  @IsOptional()
  @IsString()
  description?: string
}
