import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, IsNumber } from 'class-validator'

export class CreateAccountDto {
  @ApiProperty({
    description: 'Número da conta',
    example: '123456-7',
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'Tipo da conta',
    example: 'corrente',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Saldo da conta',
    example: 2500.75,
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    description: 'ID do usuário dono da conta',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'ID da instituição financeira',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  institutionId: string;
}
