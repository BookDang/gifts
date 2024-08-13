import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from '@/src/user/dto/create-user.dto'
import { UpdateUserDto } from '@/src/user/dto/update-user.dto'
import { User, UserDocument } from '@/src/user/schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const user = await this.userModel.findOne({ email: createUserDto.email })
      if (user) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'This email is already registered',
          },
          HttpStatus.BAD_REQUEST,
        )
      }
      createUserDto.password = await this.hashPassword(createUserDto.password)
      const createdUser = new this.userModel(createUserDto)
      return await createdUser.save()
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while creating the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  hashPassword(password: string): string {
    return password
  }

  async findAll(): Promise<UserDocument[] | HttpException> {
    try {
      // throw new HttpException(
      //   { status: 500, message: 'Internal Server Error' },
      //   500,
      // )
      return await this.userModel.find().exec()
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An error occurred while updating the user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
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
