import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from '@/users/users.service'
import { UsersController } from '@/users/users.controller'
import { User } from '@/users/entities/user.entity'
import { UsersMiddleware } from '@/users/users.middleware'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST })
      .forRoutes('users')
  }
}
