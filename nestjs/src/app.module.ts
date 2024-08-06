import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:giftsmongodb@mongodb:27017/giftsdb?authSource=admin')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
