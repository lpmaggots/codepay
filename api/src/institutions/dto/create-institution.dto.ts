import { IsNotEmpty } from 'class-validator'
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
    description: 'URL do logo da instituição',
    example: 'https://exemplo.com/logo.png',
  })
  @IsNotEmpty()
  logo: string
}