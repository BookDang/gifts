import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupsService } from '@/groups/groups.service'
import { GroupsController } from '@/groups/groups.controller'
import { Group } from '@/groups/entities/group.entity'
import { GroupUser } from '@/groups/entities/group_user.entity'
import { UsersMiddleware } from '@/middlewares/users.middleware'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GroupUser]), 
    UsersModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes('groups')
  }
}
