import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { DashboardService } from './dashboard.service'
import { DashboardSummaryDto } from './dto/dashboard-summary.dto'
import { JwtAuthGuard } from '@/src/auth/guards/jwt-auth.guard'

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOkResponse({ type: DashboardSummaryDto })
  async getDashboard(@Req() req) {
    const userId = req.user.id
    return this.dashboardService.getDashboardSummary(userId)
  }
}