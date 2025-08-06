import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Tipo da transação',
    example: 'entrada',
  })
  @IsNotEmpty()
  type: string

  @ApiProperty({
    description: 'Valor da transação',
    example: 150.75,
  })
  @IsNumber()
  amount: number

  @ApiProperty({
    description: 'Descrição detalhada da transação',
    example: 'Pagamento de boleto',
  })
  @IsNotEmpty()
  description: string

  @ApiProperty({
    description: 'ID da conta relacionada à transação',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  accountId: string
}