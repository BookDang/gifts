import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // await app.listen(3003);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.APP_PORT || 3003, '0.0.0.0')
}
bootstrap()
