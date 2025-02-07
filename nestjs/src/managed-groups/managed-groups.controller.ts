import { Controller, Post, Body, Res, HttpStatus, Param, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { ManagedGroupsService } from '@/managed-groups/managed-groups.service'
import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { Group } from '@/managed-groups/entities/group.entity'
import HTTP_CODES_MESSAGES from '@/utils/constants/http_codes.const'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { CreatePointDto } from '@/managed-groups/dto/create-point.dto'
import { AdminModeratorGuard } from '@/managed-groups/guards/admin_moderator.guard'

@Controller('managed-groups')
export class ManagedGroupsController {
  constructor(private readonly managedGroupsService: ManagedGroupsService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @Res() res: Response): Promise<Response> {
    try {
      const result: Group | Error = await this.managedGroupsService.create(createGroupDto)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.CREATED).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(error.message).json({ message: HTTP_CODES_MESSAGES[error.message] })
      }
      return res.status(error.message).json({ message: error.message })
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Post(':groupId/members/')
  async addUser(@Body() createGroupUserDto: CreateGroupUserDto, @Res() res: Response): Promise<Response> {
    try {
      const result: GroupUser | Error = await this.managedGroupsService.addUserToGroup(createGroupUserDto)

      if (result instanceof Error) {
        throw new Error(result.message)
      }

      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(error.message).json({ message: HTTP_CODES_MESSAGES[error.message] })
      }
      return res.status(500).json({ message: HTTP_CODES_MESSAGES[500] })
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Post(':groupId/members/:userId/points')
  async addPoints(@Body() createPointDto: CreatePointDto, @Param() params: {
    groupId: string,
    userId: string
  }, @Res() res: Response): Promise<Response> {
    try {
      const pointDTO = {
        groupId: + params.groupId,
        userId: + params.userId,
        points: createPointDto.points,
        expirationDate: new Date(createPointDto.expirationDate + '')
      }
      const result = await this.managedGroupsService.addPointsToUserInGroup(pointDTO)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(error.message).json({ message: HTTP_CODES_MESSAGES[error.message] })
      }
      return res.status(500).json({ message: HTTP_CODES_MESSAGES[500] })
    }
  }
}
