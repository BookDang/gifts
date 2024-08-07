import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // await app.listen(3003);
  app.setGlobalPrefix('api')
  await app.listen(process.env.APP_PORT || 3003, '0.0.0.0')
}
bootstrap()
