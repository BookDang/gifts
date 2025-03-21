import { CreateGiftsDto } from '@/managed-groups/dto/create-gifts.dto'
import { CreateGroupDto } from '@/managed-groups/dto/create-group.dto'
import { CreateGroupUserDto } from '@/managed-groups/dto/create-group_user.dto'
import { CreatePointDto } from '@/managed-groups/dto/create-point.dto'
import { UpdateGroupDto } from '@/managed-groups/dto/update-group.dto'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { AdminModeratorGuard } from '@/managed-groups/guards/admin_moderator.guard'
import { ManagedGroupsGiftsService } from '@/managed-groups/managed-groups.gifts.service'
import { ManagedGroupsService } from '@/managed-groups/managed-groups.service'
import { responseError } from '@/utils/helpers/response_error.helper'
import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { UpdateResult } from 'typeorm'

@Controller('managed-groups')
export class ManagedGroupsController {
  constructor(
    private readonly managedGroupsService: ManagedGroupsService,
    private readonly managedGroupsGiftsService: ManagedGroupsGiftsService,
  ) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto, @Res() res: Response): Promise<Response> {
    try {
      const result: Group | Error = await this.managedGroupsService.create(createGroupDto)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.CREATED).json(result)
    } catch (error) {
      return responseError(res, error)
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
      return responseError(res, error)
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
      return responseError(res, error)
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Post(':groupId/members/:userId/points')
  async addPoints(
    @Body() createPointDto: CreatePointDto,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const pointDTO = {
        groupId: groupId,
        userId: userId,
        points: createPointDto.points,
        expirationDate: new Date(createPointDto.expirationDate + ''),
      }
      const result = await this.managedGroupsService.addPointsToUserInGroup(pointDTO)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return responseError(res, error)
    }
  }

  @Get()
  async getGroupsByUserId(@Res() res: Response, @Req() req: Request): Promise<Response> {
    try {
      const userId = req['user'].id
      const result = await this.managedGroupsService.getGroupsByUserId(userId)
      if (result instanceof Error) {
        throw new Error(result.message)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return responseError(res, error)
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Get(':groupId/members/:userId/points')
  async getPointsOfUserInGroup(
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
  @Get(':groupId/members')
  async getUsersInGroup(@Res() res: Response, @Param('groupId', ParseIntPipe) groupId: number): Promise<Response> {
    try {
      const result = await this.managedGroupsService.getUsersInGroup(groupId)
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
  async getGroupById(@Res() res: Response, @Param('groupId', ParseIntPipe) groupId: number): Promise<Response> {
    try {
      const result = await this.managedGroupsService.getGroupById(groupId)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return responseError(res, error)
    }
  }

  @UseGuards(AdminModeratorGuard)
  @Post(':groupId/gifts')
  async addGiftToGroup(
    @Res() res: Response,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() createGiftsDto: CreateGiftsDto,
  ): Promise<Response> {
    try {
      const result = await this.managedGroupsGiftsService.addGiftToGroup(groupId, createGiftsDto)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      return responseError(res, error)
    }
  }
}
