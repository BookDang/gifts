import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { MongooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'
import { ConfigModule } from '@nestjs/config'

import { AppController } from '@/src/app.controller'
import { AppService } from '@/src/app.service'
import { HealthModule } from '@/src/health/health.module'
import { UsersModule } from '@/src/users/users.module'
import { AuthModule } from '@/src/auth/auth.module'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    TerminusModule,
    HealthModule,
    UsersModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module global
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
