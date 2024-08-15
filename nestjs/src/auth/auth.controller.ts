import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common'
import { AuthService } from '@/src/auth/auth.service'
import { LoginDto } from '@/src/auth/dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    )
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.authService.login(user)
  }
}
