import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { UsersService } from '@/src/users/users.service'
import { CreateUserDto } from '@/src/users/dto/create-user.dto'
import { UpdateUserDto } from '@/src/users/dto/update-user.dto'
import { THttpException } from '@/utils/types/http-exception.type'
import { AuthGuard } from '@/src/auth/auth.guard'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.create(createUserDto)
      if (newUser instanceof HttpException) {
        const error: THttpException = newUser.getResponse() as THttpException
        return res.status(HttpStatus.CONFLICT).json(error)
      }
      return res.status(HttpStatus.CREATED).json(newUser)
    } catch (error) {
      const errorResponse: THttpException =
        error.getResponse() as THttpException
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll()
      return res.status(HttpStatus.OK).json(users)
    } catch (error) {
      const errorResponse: THttpException =
        error.getResponse() as THttpException
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
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
