import { HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Group } from '@/groups/entities/group.entity'
import { CreateGroupDto } from '@/groups/dto/create-group.dto'
import { UpdateGroupDto } from '@/groups/dto/update-group.dto'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group | HttpStatus> {
    try {
      const group = await this.groupsRepository.create({ 
        ...createGroupDto, 
        user: { id: '' + createGroupDto.userId } 
      })
      const newGroup = await this.groupsRepository.save(group)
      return newGroup
    } catch (error) {
      return error
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
