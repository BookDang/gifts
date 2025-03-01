import { CreateGiftsDto } from '@/managed-groups/dto/create-gifts.dto'
import { Gift } from '@/managed-groups/entities/gift.entity'
import { GroupGift } from '@/managed-groups/entities/group_gift.entity'
import { errorInternalServer } from '@/utils/helpers/response_error.helper'
import { Injectable } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class ManagedGroupsGiftsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftsRepository: Repository<Gift>,
    @InjectRepository(GroupGift)
    private readonly groupGiftsRepository: Repository<GroupGift>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async addGiftToGroup(groupId: number, createGiftsDto: CreateGiftsDto): Promise<Gift | Error> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const giftRecord = await this.giftsRepository.create(createGiftsDto)
      const newGift = await queryRunner.manager.save(giftRecord)

      const groupGiftRecord = this.groupGiftsRepository.create({
        group: { id: groupId },
        gift: { id: newGift.id },
      })
      const newGroupGift = await queryRunner.manager.save(groupGiftRecord)

      await queryRunner.commitTransaction()
      return await this.getGroupGiftById(newGroupGift.id)
    } catch (error) {
      await queryRunner.rollbackTransaction()
      return errorInternalServer
    } finally {
      await queryRunner.release()
    }
  }

  async getGroupGiftById(groupGiftId: number): Promise<Gift | Error> {
    try {
      return this.giftsRepository.findOne({
        where: { id: groupGiftId },
        relations: ['groupGifts'],
      })
    } catch (error) {
      return errorInternalServer
    }
  }
}
