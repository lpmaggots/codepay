import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AccountsModule } from './accounts/accounts.module'
import { TransactionsModule } from './transactions/transactions.module'
import { InstitutionsModule } from './institutions/institutions.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'

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
    TransactionsModule,
    InstitutionsModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
