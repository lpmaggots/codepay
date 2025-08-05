import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { InstitutionsModule } from './institutions/institutions.module';

@Module({
  imports: [AuthModule, UsersModule, AccountsModule, TransactionsModule, InstitutionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
