import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { MongooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'
import { ConfigModule } from '@nestjs/config'

import { AppController } from '@/src/app.controller'
import { AppService } from '@/src/app.service'
import { HealthModule } from '@/src/health/health.module'
import { UsersModule } from './users/users.module'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    TerminusModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module global
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
