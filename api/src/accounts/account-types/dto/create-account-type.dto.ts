import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAccountTypeDto {
  @ApiProperty({
    description: 'Description of the account type',
    example: 'Checking Account',
  })
  @IsString()
  @IsNotEmpty()
  description: string
}