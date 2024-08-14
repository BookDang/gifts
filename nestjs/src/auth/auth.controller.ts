import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from '@/src/auth/auth.service'
import { LoginDto } from '@/src/auth/dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.login(loginDto)
      if (user && (await bcrypt.compare(loginDto.password, user.password))) {
        const payload = { id: user._id, username: user.name }
        return {
          access_token: await this.jwtService.signAsync(payload),
        }
      } else {
        throw new UnauthorizedException()
      }
    } catch (error) {
      return error
    }
  }
}
