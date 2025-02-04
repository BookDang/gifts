import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { GroupsService } from '@/groups/groups.service'
import { CreateGroupDto } from '@/groups/dto/create-group.dto'
import { UpdateGroupDto } from '@/groups/dto/update-group.dto'
import { Group } from './entities/group.entity'
import { CreateGroupUserDto } from '@/groups/dto/create-group_user.dto'
import HTTP_CODES_MESSAGES from '@/utils/constants/http_codes.const'
import { USER_EXISTS_IN_GROUP } from '@/utils/constants/user.const'

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @Res() res: Response): Promise<Response> {
    try {
      const result: Error | Group = await this.groupsService.create(createGroupDto)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.CREATED).json(result)
    } catch (error) {
      return res.status(error.message).json({ message: error.message })
    }
  }

  @Post('add-user-to-group')
  async addUser(@Body() createGroupUserDto: CreateGroupUserDto, @Res() res: Response): Promise<Response> {
    try {
      const result: Group | Error = await this.groupsService.addUserToGroup(createGroupUserDto)

      if (result instanceof Error) {
        throw new Error(result.message)
      }

      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return res.status(error.message).json({ message: HTTP_CODES_MESSAGES[error.message] })
    }
  }

  @Get()
  findAll() {
    return this.groupsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id)
  }
}
