import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'ana.souza@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
