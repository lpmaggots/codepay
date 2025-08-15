import { Module } from '@nestjs/common'
import { AccountTypesController } from './account-types.controller'
import { AccountTypesService } from './account-types.service'

@Module({
  controllers: [AccountTypesController],
  providers: [AccountTypesService],
})
export class AccountTypesModule {}