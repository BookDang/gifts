import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Get,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from '@/src/auth/auth.service'
import { THttpException } from '@/utils/types/http-exception.type'
import { LoginDto } from '@/src/auth/dto/login.dto'
import { AuthGuard } from '@/src/auth/auth.guard'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const token = await this.authService.login(loginDto)
      if (token instanceof HttpException) {
        const error: THttpException = token.getResponse() as THttpException
        return res.status(HttpStatus.UNAUTHORIZED).json(error)
      }
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 3,
        sameSite: 'strict',
      })
      console.log('token', token)

      return res.status(HttpStatus.OK).json(token)
    } catch (error) {
      const errorResponse: THttpException =
        error.getResponse() as THttpException
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }

  @Get('login')
  @UseGuards(AuthGuard)
  async findAll(@Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json('Hello from auth')
    } catch (error) {
      const errorResponse: THttpException =
        error.getResponse() as THttpException
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse)
    }
  }
}
