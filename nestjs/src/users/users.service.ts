import { CreateUserDto } from '@/users/dto/create-user.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'
import { User } from '@/users/entities/user.entity'
import { DEFAULT_IMAGE_URL, SALT_OR_ROUNDS } from '@/utils/constants/commons.const'
import { ER_DUP_ENTRY } from '@/utils/constants/mysql.const'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'

type UserWithoutPassword = Omit<User, 'password'>

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword | Error> {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password)
      createUserDto.avatar_url = createUserDto.avatar_url || DEFAULT_IMAGE_URL
      const user = await this.usersRepository.create(createUserDto)
      const { password, ...userLessPassword } = await this.usersRepository.save(user)
      return userLessPassword
    } catch (error) {
      if (error.code === ER_DUP_ENTRY) {
        return new Error(HttpStatus.CONFLICT.toString())
      }
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    }
  }

  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, SALT_OR_ROUNDS)
    return hashPassword
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User | null | Error> {
    try {
      const user = await this.usersRepository.findOne({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })
      return user
    } catch (error) {
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    }
  }

  async checkUserExistsById(id: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { id },
    })
    return !!user
  }

  findAll() {
    return `This action returns all users`
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
