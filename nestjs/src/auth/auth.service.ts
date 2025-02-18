import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  test = ''
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(usernameOrEmail: string, password: string): Promise<{ access_token: string } | Error> {
    try {
      const user = await this.usersService.findOneByUsernameOrEmail(usernameOrEmail)

      if (user instanceof Error || user === null) {
        throw new UnauthorizedException()
      }
      const isPasswordMatch = await this.comparePassword(password, (user as User).password)
      if (!isPasswordMatch) {
        throw new UnauthorizedException()
      }

      return this.createJWTToken(user as User)
    } catch (error) {
      if (error.status) {
        return new Error(error.status.toString())
      }
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    }
  }

  async createJWTToken(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, userId: user.id, email: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async comparePassword(password: string, userPassword: string): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(password, userPassword)
    return isPasswordMatch
  }
}
