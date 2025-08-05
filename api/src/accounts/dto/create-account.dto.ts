import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class CreateAccountDto {
  @IsNotEmpty()
  number: string;

  @IsNotEmpty()
  type: string;

  @IsNumber()
  balance: number;

  @IsUUID()
  userId: string;

  @IsUUID()
  institutionId: string;
}