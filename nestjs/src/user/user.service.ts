import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@/src/user/dto/create-user.dto'
import { UpdateUserDto } from '@/src/user/dto/update-user.dto'
import { UserDocument } from '@/src/user/schemas/user.schema'

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return {} as UserDocument
  }

  async findAll(): Promise<UserDocument[]> {
    return [] as UserDocument[]
  }

  async findOne(id: string): Promise<UserDocument> {
    return {} as UserDocument
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return {} as UserDocument
  }

  async remove(id: string): Promise<UserDocument> {
    return {} as UserDocument
  }
}
