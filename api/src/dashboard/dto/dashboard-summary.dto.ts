import { ApiProperty } from '@nestjs/swagger'

export class DashboardSummaryDto {
  @ApiProperty({
    description: 'Número total de instituições conectadas ao usuário'
  })
  institutionsConnected: number

  @ApiProperty({
    description: 'Saldo total somado de todas as contas do usuário',
    type: Number,
  })
  totalBalance: number

  @ApiProperty({
    description: 'Quantidade de contas ativas do usuário'
  })
  activeAccounts: number

  @ApiProperty({
    description: 'Data da última atualização dos dados',
    type: String,
    format: 'date-time',
  })
  lastUpdatedAt: string
}
