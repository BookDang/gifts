import { Controller, Get } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  check() {
    console.log(' process.env.JWT_SECRET', process.env.JWT_SECRET)

    return this.healthService.check()
  }
}
