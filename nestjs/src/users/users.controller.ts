import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from '@/users/users.service'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'
import { USER_EXISTS } from '@/utils/constants/user.const'

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
      if (error.message) {
        return res.status(error.message).json({ message: USER_EXISTS })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
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
