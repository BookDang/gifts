import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
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

  findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel
      .findOne({
        email,
      })
      .select('+password')
      .exec()
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'> | HttpException> {
    try {
      const { email, password } = createUserDto
      const existingUser = await this.userModel.findOne({ email })
      if (existingUser) {
        return new ConflictException('User already exists')
      }
      createUserDto.password = await bcrypt.hash(password, 10)
      const createdUser = new this.userModel({
        ...createUserDto,
        password: createUserDto.password,
        createdAt: new Date(),
      })
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
