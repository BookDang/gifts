import { Injectable } from '@nestjs/common'
import { LoginDto } from '@/src/auth/dto/login.dto'
import { UsersService } from '@/src/users/users.service'
import { UserDocument } from '@/src/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(data: LoginDto): Promise<UserDocument> {
    try {
      const user = await this.usersService.findOneByEmail(data.email)
      return user
    } catch (error) {
      return error
    }
  }
}
