import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class BankApiService {
  private readonly logger = new Logger(BankApiService.name)
  private readonly apiUrl: string

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('BRASILAPI_URL')!
  }

  async getBanks() {
    try {
      const response = await axios.get(this.apiUrl)
      return response.data
    } catch (error) {
      this.logger.error('Error fetching banks from Bacen API (BrasilAPI)', error)
      throw new Error('Error fetching banks from the public API')
    }
  }
}
