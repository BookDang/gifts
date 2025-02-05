import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, QueryRunner, Repository } from 'typeorm'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { USER_STATUSES_ENUM, USER_ROLES_ENUM } from '@/utils/enums/user.enum'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { UsersService } from '@/users/users.service'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class ManagedGroupsService {
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
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    } finally {
      await queryRunner.release()
    }
  }

  async addUserToGroup(createGroupUserDto: CreateGroupUserDto): Promise<GroupUser | Error> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const { userId, groupId } = createGroupUserDto
      if (!(await this.checkGroupExistById(groupId))) {
        throw new BadRequestException()
      }

      if (!(await this.checkUserExistById(userId, queryRunner))) {
        throw new BadRequestException()
      }

      if (await this.checkUserExistInGroupByIds(userId, groupId)) {
        throw new ConflictException()
      }

      const newGroupUser = await this.createGroupUser(userId, groupId, queryRunner)
      await queryRunner.commitTransaction()
      return newGroupUser
    } catch (error) {
      await queryRunner.rollbackTransaction()
      if (error.status) {
        return new Error(error.status.toString())
      }
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
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

  async createGroupUser(userId: number, groupId: number, queryRunner: QueryRunner): Promise<GroupUser> {
    const groupUser = await this.groupUsersRepository.create({
      status: USER_STATUSES_ENUM.ACTIVE,
      role: USER_ROLES_ENUM.MEMBER,
      joinedAt: new Date(),
      user: { id: userId },
      group: { id: groupId },
    })
    const newGroupUser = await queryRunner.manager.save(groupUser)
    return newGroupUser
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
}
