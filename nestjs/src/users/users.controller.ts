import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from '@/src/users/users.service'
import { CreateUserDto } from '@/src/users/dto/create-user.dto'
import { UpdateUserDto } from '@/src/users/dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.create(createUserDto)
      return res.status(HttpStatus.CREATED).json(newUser)
    } catch (error) {
      return error
    }
  }

  @Get()
  findAll() {
    try {
      const res = this.usersService.findAll()
      return res
    } catch (error) {
      return error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
