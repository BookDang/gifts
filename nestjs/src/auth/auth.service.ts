import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@/src/users/users.service'
import { LoginDto } from '@/src/auth/dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string } | HttpException> {
    try {
      const user = await this.usersService.findOneByEmail(loginDto.email)
      if (user instanceof HttpException) {
        throw new UnauthorizedException('Invalid username or password.')
      }
      const isPasswordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      )
      if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid username or password.')
      }
      const payload = { email: user.email, sub: user.id }
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (error) {
      return error
    }
  }
}
