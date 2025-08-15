import { Module } from '@nestjs/common'
import { TransactionTypesController } from './transaction-types.controller'
import { TransactionTypesService } from './transaction-types.service'

@Module({
  controllers: [TransactionTypesController],
  providers: [TransactionTypesService],
})
export class TransactionTypesModule {}
