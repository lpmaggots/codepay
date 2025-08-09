import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Request,
} from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { AccountsFilterDto } from './dto/accounts-filter.dto'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('accounts')
@ApiBearerAuth() // Indica que as rotas precisam de token
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  create(@Request() req, @Body() dto: CreateAccountDto) {
    const userId = req.user.id; // Pega o ID do usuário do token
    return this.service.create(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'List accounts with pagination and filters' })
  findAll(@Request() req, @Query() filters: AccountsFilterDto) {
    const userId = req.user.id;
    return this.service.findAll(userId, filters)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  findOne(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.service.findOne(id, userId)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update account by ID' })
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateAccountDto) {
    const userId = req.user.id;
    return this.service.update(id, userId, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by ID' })
  remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    return this.service.remove(id, userId)
  }
}
