import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { CreateUserDTO, UpdateUserDTO, UserListItemDTO } from './user.dto'
import { UsersService } from './users.service'

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: [UserListItemDTO] })
  async findAll() {
    return await this.usersService.findAll()
  }

  @Get(':userId')
  async findById(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }
    return user
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }
    return user
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDTO) {
    return await this.usersService.create(data)
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('userId', ParseUUIDPipe) userId: string, @Body() data: UpdateUserDTO) {
    const user = await this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }
    return await this.usersService.update(userId, data)
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.usersService.findById(userId)
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }
    return await this.usersService.delete(userId)
  }
}
