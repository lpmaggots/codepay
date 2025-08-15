import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionTypeDto {
  @ApiProperty({
    description: 'Description of the transaction type',
    example: 'DEBIT',
  })
  @IsString()
  @IsNotEmpty()
  description: string
}
