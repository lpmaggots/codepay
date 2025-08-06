import { IsEmail, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty({
    description: 'E-mail do usuário para registro',
    example: 'ana.souza@email.com',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Senha do usuário (mínimo de 6 caracteres)',
    example: 'senha123',
  })
  @IsString()
  @MinLength(6)
  password: string
}