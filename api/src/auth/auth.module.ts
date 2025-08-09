import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt-strategy'; // ou ajuste para o seu caminho real
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }, // pode alterar para '1h' se preferir
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService, // Adicionado do seu primeiro código
  ],
})
export class AuthModule {}
