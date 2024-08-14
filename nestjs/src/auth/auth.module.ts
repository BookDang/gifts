import { Module } from '@nestjs/common'
import { AuthService } from '@/src/auth/auth.service'
import { AuthController } from '@/src/auth/auth.controller'
import { UsersModule } from '@/src/users/users.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET', // process.env.JWT_SECRET, // Load secret from environment variable
      signOptions: { expiresIn: '60m' }, // Token expiry time
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
