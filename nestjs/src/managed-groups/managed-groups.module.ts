import { TypeOrmModule } from '@nestjs/typeorm'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ManagedGroupsService } from '@/managed-groups/managed-groups.service'
import { ManagedGroupsController } from '@/managed-groups/managed-groups.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { UsersModule } from '@/users/users.module'
import { GroupUser } from '@/managed-groups/entities/group_user.entity'
import { Group } from '@/managed-groups/entities/group.entity'
import { Point } from '@/managed-groups/entities/point.entity'

@Module({
  controllers: [ManagedGroupsController],
  providers: [ManagedGroupsService],
  imports: [TypeOrmModule.forFeature([Group, GroupUser, Point]), UsersModule],
})
export class ManagedGroupsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('managed-groups')
  }
}
