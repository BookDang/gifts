import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { MongooseHealthIndicator } from '@nestjs/terminus'
import { HealthService } from '@/src/health/health.service'
import { HealthController } from '@/src/health/health.controller'

@Module({
  imports: [TerminusModule],
  providers: [HealthService, MongooseHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
