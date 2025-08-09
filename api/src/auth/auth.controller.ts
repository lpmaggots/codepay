import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Public } from './decorators/public.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @ApiBody({ type: LoginDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
