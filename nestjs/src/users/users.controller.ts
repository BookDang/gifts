import { CreateUserDto } from '@/users/dto/create-user.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'
import { UsersService } from '@/users/users.service'
import { responseError } from '@/utils/helpers/response_error.helper'
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.usersService.create(createUserDto)

      if (result instanceof Error) {
        throw new Error(result.message)
      }

      return res.status(HttpStatus.CREATED).json(result)
    } catch (error) {
      responseError(res, error)
    }
  }

  @Get()
  findAll(@Req() request: Request) {
    console.log('Request user Book', request['user'])
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
