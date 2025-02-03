import { HttpStatus, Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Group } from '@/groups/entities/group.entity'
import { CreateGroupDto } from '@/groups/dto/create-group.dto'
import { UpdateGroupDto } from '@/groups/dto/update-group.dto'
import { GroupUser } from '@/groups/entities/group_user.entity'
import { USER_ROLES_ENUM, USER_STATUSES_ENUM } from '@/utils/enums/user.enum'

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

  async create(createGroupDto: CreateGroupDto): Promise<Group | HttpStatus> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const group = await this.groupsRepository.create({
        ...createGroupDto,
        user: { id: '' + createGroupDto.userId },
      })
      const newGroup = await queryRunner.manager.save(group)
      
      const groupUser = await this.groupUsersRepository.create({
        status: USER_STATUSES_ENUM.ACTIVE,
        role: USER_ROLES_ENUM.ADMIN,
        joinedAt: new Date(),
        user: { id: '' + createGroupDto.userId },
        group: { id: newGroup.id },
      })
      await queryRunner.manager.save(groupUser)

      await queryRunner.commitTransaction()
      return newGroup
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return error
    } finally {
      await queryRunner.release()
    }
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
