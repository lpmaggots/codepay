import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateInstitutionTypeDto {
  @ApiProperty({
    description: 'Description of the institution type',
    example: 'Bank',
  })
  @IsString()
  @IsNotEmpty()
  description: string
}
