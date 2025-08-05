import { IsNotEmpty } from 'class-validator'

export class CreateInstitutionDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  code: string

  @IsNotEmpty()
  logo: string
}