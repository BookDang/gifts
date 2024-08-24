import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import { AppModule } from '@/src/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // await app.listen(3003);
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.APP_PORT || 3003, '0.0.0.0')
}
bootstrap()
