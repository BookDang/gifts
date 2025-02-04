import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { DataSource, In, QueryRunner, Repository } from 'typeorm'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Group } from '@/groups/entities/group.entity'
import { CreateGroupDto } from '@/groups/dto/create-group.dto'
import { UpdateGroupDto } from '@/groups/dto/update-group.dto'
import { GroupUser } from '@/groups/entities/group_user.entity'
import { USER_ROLES_ENUM, USER_STATUSES_ENUM } from '@/utils/enums/user.enum'
import { CreateGroupUserDto } from '@/groups/dto/create-group_user.dto'
import { UsersService } from '@/users/users.service'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(GroupUser)
    private readonly groupUsersRepository: Repository<GroupUser>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group | Error> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const newGroup = await this.createGroup(createGroupDto, queryRunner)

      await this.createGroupUser(createGroupDto.userId, newGroup.id, queryRunner)

      await queryRunner.commitTransaction()
      return newGroup
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return new Error(error.message)
    } finally {
      await queryRunner.release()
    }
  }

  async createGroup(createGroupDto: CreateGroupDto, queryRunner: QueryRunner): Promise<Group> {
    const group = await this.groupsRepository.create({
      ...createGroupDto,
      user: { id: createGroupDto.userId },
    })
    return await queryRunner.manager.save(group)
  }

  async createGroupUser(userId: number, groupId: number, queryRunner: QueryRunner): Promise<any> {
    const groupUser = await this.groupUsersRepository.create({
      status: USER_STATUSES_ENUM.ACTIVE,
      role: USER_ROLES_ENUM.MEMBER,
      joinedAt: new Date(),
      user: { id: userId },
      group: { id: groupId },
    })
    return await queryRunner.manager.save(groupUser)
  }

  async addUserToGroup(createGroupUserDto: CreateGroupUserDto): Promise<Group | Error> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const { userId, groupId } = createGroupUserDto
      if (!await this.checkGroupExistById(groupId)) {
        throw new Error(HttpStatus.BAD_REQUEST.toString())
      }

      if (!(await this.checkUserExistById(userId, queryRunner))) {
        throw new Error(HttpStatus.BAD_REQUEST.toString())
      }

      if (await this.checkUserExistInGroupByIds(userId, groupId)) {
        throw new Error(HttpStatus.CONFLICT.toString())
      }

      const newGroupUser = await this.createGroupUser(userId, groupId, queryRunner)
      await queryRunner.commitTransaction()
      return newGroupUser
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return new Error(error.message)
    } finally {
      await queryRunner.release()
    }
  }

  async checkGroupExistById(groupId: number): Promise<boolean> {
    const group = await this.groupsRepository.findOne({
      where: { id: groupId, deleted_at: null },
    })
    return !!group
  }

  async checkUserExistById(userId: number, queryRunner: QueryRunner): Promise<boolean> {
    const usersRepository: Repository<User> = queryRunner.manager.getRepository(User)
    const usersService = new UsersService(usersRepository)
    const isUserExist = await usersService.checkUserExistsById(userId)
    return isUserExist
  }

  async checkUserExistInGroupByIds(userId: number, groupId: number): Promise<boolean> {
    const groupUser = await this.groupUsersRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    })
    return !!groupUser
  }

  findAll() {
    return `This action returns all groups`
  }

  findOne(id: number) {
    return `This action returns a #${id} group`
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`
  }

  remove(id: number) {
    return `This action removes a #${id} group`
  }
}
