import { Gift } from '@/managed-groups/entities/gift.entity'
import { Group } from '@/managed-groups/entities/group.entity'
import { GroupGift } from '@/managed-groups/entities/group_gift.entity'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { Point } from '@/managed-groups/entities/point.entity'
import { ManagedGroupsController } from '@/managed-groups/managed-groups.controller'
import { ManagedGroupsGiftsService } from '@/managed-groups/managed-groups.gifts.service'
import { ManagedGroupsService } from '@/managed-groups/managed-groups.service'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { UsersModule } from '@/users/users.module'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  controllers: [ManagedGroupsController],
  providers: [ManagedGroupsService, ManagedGroupsGiftsService],
  imports: [TypeOrmModule.forFeature([Group, GroupUser, Point, Gift, GroupGift]), UsersModule],
})
export class ManagedGroupsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('managed-groups')
  }
}
