import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { AccountsService } from './accounts.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account' })
  create(@Body() dto: CreateAccountDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'List all accounts' })
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update account by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
    return this.service.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id)
  }
}