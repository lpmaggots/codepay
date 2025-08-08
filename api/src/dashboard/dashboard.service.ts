// src/dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { DashboardSummaryDto } from './dto/dashboard-summary.dto'

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardSummary(userId: string): Promise<DashboardSummaryDto> {
    const institutionsConnected = await this.prisma.institution.count({
      where: {
        accounts: {
          some: {
            userId,
          },
        },
      },
    })

    const accounts = await this.prisma.account.findMany({
      where: { userId },
      select: {
        balance: true,
      },
    })

    const activeAccounts = accounts.length;
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

    const lastUpdatedAccount = await this.prisma.account.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true },
    })

    return {
      institutionsConnected,
      activeAccounts,
      totalBalance,
      lastUpdatedAt: lastUpdatedAccount?.updatedAt.toISOString() || new Date().toISOString(),
    }
  }
}