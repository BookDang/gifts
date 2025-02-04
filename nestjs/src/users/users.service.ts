import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from '@/users/dto/create-user.dto'
import { UpdateUserDto } from '@/users/dto/update-user.dto'
import { User } from '@/users/entities/user.entity'
import { ER_DUP_ENTRY } from '@/utils/constants/mysql.const'

type UserWithoutPassword = Omit<User, 'password'>

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword | HttpStatus.CONFLICT | HttpStatus.INTERNAL_SERVER_ERROR> {
    try {
      createUserDto.password = await this.hashPassword(createUserDto.password)
      const user = await this.usersRepository.create(createUserDto)
      const { password, ...userLessPassword } = await this.usersRepository.save(user)
      return userLessPassword
    } catch (error) {
      if (error.code === ER_DUP_ENTRY) {
        return HttpStatus.CONFLICT
      }
      return HttpStatus.INTERNAL_SERVER_ERROR
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hashPassword = await bcrypt.hash(password, saltOrRounds)
    return hashPassword
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User | null | Error> {
    try {
      const user = await this.usersRepository.findOne({
        where: [
          { username: usernameOrEmail }, 
          { email: usernameOrEmail }
        ],
      })
      return user
    } catch (error) {
      return new Error(error.message)
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
