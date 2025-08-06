import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Ana Souza',
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'ana.souza@email.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Senha do usuário (mínimo de 6 caracteres)',
    example: 'senha123',
  })
  @MinLength(6)
  password: string
}