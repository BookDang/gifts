import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { MongooseModule } from '@nestjs/mongoose'
import { TerminusModule } from '@nestjs/terminus'

import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { HealthModule } from './health/health.module'
import { UserModule } from './user/user.module';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    TerminusModule,
    HealthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
