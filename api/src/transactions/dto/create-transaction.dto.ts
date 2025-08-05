import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class CreateTransactionDto {
  @IsNotEmpty()
  type: string

  @IsNumber()
  amount: number

  @IsNotEmpty()
  description: string

  @IsUUID()
  accountId: string
}
