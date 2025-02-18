import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { CreatePointDto } from '@/managed-groups/dto/create-point.dto'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { AdminModeratorGuard } from '@/managed-groups/guards/admin_moderator.guard'
import { ManagedGroupsService } from '@/managed-groups/managed-groups.service'
import HTTP_CODES_MESSAGES, { DEFAULT_ERROR_RESPONSE } from '@/utils/constants/http_codes.const'
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR_RESPONSE)
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR_RESPONSE)
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Post(':groupId/members/:userId/points')
  async addPoints(
    @Body() createPointDto: CreatePointDto,
    @Param()
    params: {
      groupId: string
      userId: string
    },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const pointDTO = {
        groupId: +params.groupId,
        userId: +params.userId,
        points: createPointDto.points,
        expirationDate: new Date(createPointDto.expirationDate + ''),
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR_RESPONSE)
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Get(':groupId/members/:userId/points')
  async getPoints(
    @Param()
    params: {
      groupId: string
      userId: string
    },
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result = await this.managedGroupsService.getPointsOfUserInGroup(+params.groupId, +params.userId)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      if (error.message) {
        return res.status(error.message).json({
          message: HTTP_CODES_MESSAGES[error.message],
          statusCode: error.message,
        })
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(DEFAULT_ERROR_RESPONSE)
    }
  }
}
