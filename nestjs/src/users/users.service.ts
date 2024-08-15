import { ConflictException, HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateUserDto } from '@/src/users/dto/create-user.dto'
import { UpdateUserDto } from '@/src/users/dto/update-user.dto'
import { User, UserDocument } from '@/src/users/schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private omitPassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'> | HttpException> {
    try {
      // Check if the user already exists
      const { email } = createUserDto
      const existingUser = await this.userModel.findOne({ email })
      if (existingUser) {
        return new ConflictException('User already exists')
      }
      const createdUser = new this.userModel(createUserDto)
      const newUser = await createdUser.save()
      return this.omitPassword(newUser.toObject())
    } catch (error) {
      return error
    }
  }

  async findAll(): Promise<UserDocument[] | HttpException> {
    try {
      return await this.userModel.find().exec()
    } catch (error) {
      return error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
