import {
  Controller,
  Post,
  Body,
  HttpCode,
  Res,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '@/src/auth/auth.service'
import { LoginDto } from '@/src/auth/dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.login(loginDto)
      if (user && (await bcrypt.compare(loginDto.password, user.password))) {
        const payload = { id: user._id, username: user.name }
        const secret = this.configService.get<string>('JWT_SECRET')

        const accessToken = await this.jwtService.signAsync(payload, { secret })
        return res.status(HttpStatus.OK).json({ accessToken })
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Authentication credentials were not provided.',
          error: 'Unauthorized',
        })
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      })
    }
  }
}
