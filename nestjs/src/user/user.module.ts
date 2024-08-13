import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'
import { UserService } from '@/src/user/user.service'
import { UserController } from '@/src/user/user.controller'
import { User, UserSchema } from '@/src/user/schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
