import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { CreatePointDto } from '@/managed-groups/dto/create-point.dto'
import { UpdateGroupDto } from '@/managed-groups/dto/update-group.dto'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { AdminModeratorGuard } from '@/managed-groups/guards/admin_moderator.guard'
import { ManagedGroupsService } from '@/managed-groups/managed-groups.service'
import { responseError } from '@/utils/helpers/response_error.helper'
import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { UpdateResult } from 'typeorm'

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
      responseError(res, error)
    }
  }

  @Put(':groupId')
  async update(
    @Body() updateGroupDto: UpdateGroupDto,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const result: UpdateResult | Error = await this.managedGroupsService.update(groupId, updateGroupDto)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      responseError(res, error)
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
      responseError(res, error)
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
      responseError(res, error)
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
      return responseError(res, error)
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Get(':groupId')
  async getUsersInGroup() {
    try {
      return 'This action returns all users in group'
    } catch (error) {
      
    }
  }
}
