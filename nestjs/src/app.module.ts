import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { AuthModule } from '@/auth/auth.module'
import { ManagedGroupsModule } from '@/managed-groups/managed-groups.module'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đặt module config thành global (có thể truy cập ở mọi nơi)
      envFilePath: '.env', // Đường dẫn tới file .env
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' }, // Thời gian sống của token (600s = 10 phút)
      // signOptions: { expiresIn: '120s' }, // Thời gian sống của token (120s = 2 phút)
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    AuthModule,
    ManagedGroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
