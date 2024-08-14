import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from '@/src/auth/dto/login.dto'
import { UsersService } from '@/src/users/users.service'
import { UserDocument } from '@/src/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<UserDocument> {
    const user = await this.usersService.findOneByEmail(data.email)
    return user
  }
}
