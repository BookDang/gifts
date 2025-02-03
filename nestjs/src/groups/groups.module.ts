import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupsService } from '@/groups/groups.service'
import { GroupsController } from '@/groups/groups.controller'
import { Group } from '@/groups/entities/group.entity'
import { GroupUser } from '@/groups/entities/group_user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Group, GroupUser])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
