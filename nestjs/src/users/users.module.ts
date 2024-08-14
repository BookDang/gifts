import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { UsersService } from '@/src/users/users.service'
import { UserController } from '@/src/users/users.controller'
import { User, UserSchema } from '@/src/users/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
