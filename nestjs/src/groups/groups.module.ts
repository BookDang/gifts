import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GroupsService } from '@/groups/groups.service'
import { GroupsController } from '@/groups/groups.controller'
import { Group } from '@/groups/entities/group.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
