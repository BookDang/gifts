import { HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@/users/users.service'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(usernameOrEmail: string, password: string): Promise<{ access_token: string } | HttpStatus> {
    try {
      const user = await this.usersService.findOneByUsernameOrEmail(usernameOrEmail)
      if (user instanceof Error) {
        throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
      }

      if (!user) {
        throw new Error(HttpStatus.UNAUTHORIZED.toString())
      }

      const isPasswordMatch = await this.comparePassword(password, (user as User).password)
      if (!isPasswordMatch) {
        throw new Error(HttpStatus.UNAUTHORIZED.toString())
      }

      return this.createJWTToken(user as User)
    } catch (error) {
      return error
    }
  }

  async createJWTToken(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id, email: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async comparePassword(password: string, userPassword: string): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(password, userPassword)
    return isPasswordMatch
  }
}
