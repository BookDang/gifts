import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { UpdateGroupDto } from '@/managed-groups/dto/update-group.dto'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { Point } from '@/managed-groups/entities/point.entity'
import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { USER_ROLES_ENUM, USER_STATUSES_ENUM } from '@/utils/enums/user.enum'
import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { DataSource, MoreThanOrEqual, QueryRunner, Repository, UpdateResult } from 'typeorm'

@Injectable()
export class ManagedGroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(GroupUser)
    private readonly groupUsersRepository: Repository<GroupUser>,
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
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
    groupId: number
    points: number
    expirationDate: Date
  }): Promise<Point | Error> {
    try {
      const groupUser = await this.groupUsersRepository.findOne({
        where: { group: { id: pointDTO.groupId } },
      })

      if (!groupUser) {
        throw new BadRequestException()
      }

      const point = await this.dataSource.manager.create(Point, {
        group_user_id: { id: pointDTO.groupId },
        points: pointDTO.points,
        expiration_date: pointDTO.expirationDate,
      })
      return await this.dataSource.manager.save(point)
    } catch (error) {
      if (error.status) {
        return new Error(error.status.toString())
      }
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    }
  }

  async update(groupId: number, updateGroupDto: UpdateGroupDto): Promise<UpdateResult | Error> {
    try {
      const group = await this.groupsRepository.findOne({
        where: { id: groupId, deleted_at: null },
      })
      if (!group) {
        throw new BadRequestException()
      }

      return await this.groupsRepository.update(
        { id: groupId },
        {
          group_name: updateGroupDto.group_name || group.group_name,
          description: updateGroupDto.description || group.description,
          avatar_url: updateGroupDto.avatar_url || group.avatar_url,
        },
      )
    } catch (error) {
      if (error.status) {
        return new Error(error.status.toString())
      }
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
    }
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

  async getPointsOfUserInGroup(groupId: number, userId: number): Promise<Point[] | Error> {
    try {
      const expirationDate = moment().format('yyyy-MM-DD 00:00:00')
      const points = await this.pointsRepository.findBy({
        group_user: { id: groupId },
        expiration_date: MoreThanOrEqual(new Date(expirationDate)),
      })
      return points
    } catch (error) {
      return new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString())
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
}
