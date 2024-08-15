import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from '@/src/auth/auth.service'
import { AuthController } from '@/src/auth/auth.controller'
import { UsersModule } from '@/src/users/users.module'

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '60m' }, // Token expiry time
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
