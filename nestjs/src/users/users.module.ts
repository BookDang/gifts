import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersService } from '@/src/users/users.service'
import { UsersController } from '@/src/users/users.controller'
import { User, UserSchema } from '@/src/users/schemas/user.schema'
import { EXPIRESIN } from '@/utils/constants/auth.constants'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: EXPIRESIN }, // 3 minutes
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
