export class DashboardSummary {
  institutionsConnected: number
  totalBalance: number
  activeAccounts: number
  lastUpdatedAt: Date

  constructor(
    institutionsConnected: number,
    totalBalance: number,
    activeAccounts: number,
    lastUpdatedAt: Date,
  ) {
    this.institutionsConnected = institutionsConnected
    this.totalBalance = totalBalance
    this.activeAccounts = activeAccounts
    this.lastUpdatedAt = lastUpdatedAt
  }
}
