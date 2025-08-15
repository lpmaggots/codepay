import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AccountsModule } from './accounts/accounts.module'
import { AccountTypesModule } from './accounts/account-types/account-types.module'
import { TransactionsModule } from './transactions/transactions.module'
import { TransactionTypesModule } from './transactions/transaction-types/transaction-types.module'
import { TransactionCategoriesModule } from './transactions/transaction-categories/transaction-categories.module'
import { InstitutionsModule } from './institutions/institutions.module'
import { InstitutionTypesModule } from './institutions/institution-types/institution-types.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    AccountsModule,
    AccountTypesModule,
    TransactionsModule,
    TransactionTypesModule,
    TransactionCategoriesModule,
    InstitutionsModule,
    InstitutionTypesModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})
export class AppModule {}