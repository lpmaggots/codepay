import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionCategoryDto {
  @ApiProperty({
    description: 'Description of the transaction category',
    example: 'Utilities',
  })
  @IsString()
  @IsNotEmpty()
  description: string
}
