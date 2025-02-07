import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, QueryRunner, Repository } from 'typeorm'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { USER_STATUSES_ENUM, USER_ROLES_ENUM } from '@/utils/enums/user.enum'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { UsersService } from '@/users/users.service'
import { User } from '@/users/entities/user.entity'
import { Point } from '@/managed-groups/entities/point.entity'

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

      await this.addGroupUser(createGroupDto.userId, newGroup.id, queryRunner, USER_ROLES_ENUM.ADMIN)

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

      const newGroupUser = await this.addGroupUser(userId, groupId, queryRunner)
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

  async addPointsToUserInGroup(pointDTO: {
    userId: number
    groupId: number
    points: number
    expirationDate: Date
  }): Promise<Point | Error> {
    try {
      const groupUser = await this.groupUsersRepository.findOne({
        where: { user: { id: pointDTO.userId }, group: { id: pointDTO.groupId } },
      })

      if (!groupUser) {
        throw new BadRequestException()
      }

      const point = await this.dataSource.manager.create(Point, {
        group: { id: pointDTO.groupId },
        user: { id: pointDTO.userId },
        points: pointDTO.points,
        expiration_date: pointDTO.expirationDate,
      })
      return await this.dataSource.manager.save(point)
    } catch (error) {

      console.log('ManagedGroupsService -> addPointsToUserInGroup -> error', error);
      
      if (error.status) {
        return new Error(error.status.toString())
      }
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    }
    return null
  }

  async createGroup(createGroupDto: CreateGroupDto, queryRunner: QueryRunner): Promise<Group> {
    const group = await this.groupsRepository.create({
      ...createGroupDto,
      user: { id: createGroupDto.userId },
    })
    return await queryRunner.manager.save(group)
  }

  async addGroupUser(
    userId: number,
    groupId: number,
    queryRunner: QueryRunner,
    role: USER_ROLES_ENUM = USER_ROLES_ENUM.MEMBER,
  ): Promise<GroupUser> {
    const groupUser = await this.groupUsersRepository.create({
      status: USER_STATUSES_ENUM.ACTIVE,
      role: role,
      joined_at: new Date(),
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
