import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email)
      // check if the user HttpException
      if (user instanceof HttpException) {
        return null
      }

      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user
        return result
      }
      return null
    } catch (error) {
      return null
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
