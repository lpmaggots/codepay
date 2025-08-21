import { Module } from '@nestjs/common'
import { InstitutionsController } from './institutions.controller'
import { InstitutionsService } from './institutions.service'
import { BankApiService } from './bank-api.service'

@Module({
  controllers: [InstitutionsController],
  providers: [InstitutionsService, BankApiService],
})
export class InstitutionsModule {}