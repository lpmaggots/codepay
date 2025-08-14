import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateInstitutionDto {
  @ApiProperty({
    description: 'Nome da instituição financeira',
    example: 'Banco Exemplo S.A.',
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Código identificador da instituição (ex: código bancário)',
    example: '123',
  })
  @IsNotEmpty()
  code: string

  @ApiProperty({
    description: 'ISPB da instituição',
    example: '12345678',
  })
  @IsNotEmpty()
  ispb: string

  @ApiProperty({
    description: 'ID do tipo de instituição',
    example: '550e8400-e29b-41d4-a716-446655440099',
  })
  @IsUUID()
  typeId: string
}
