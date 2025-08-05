import { IsOptional } from 'class-validator'

export class UpdateInstitutionDto {
  @IsOptional()
  name?: string

  @IsOptional()
  code?: string

  @IsOptional()
  logo?: string
}
