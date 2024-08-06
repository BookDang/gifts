import { Injectable } from '@nestjs/common'
import {
  HealthCheckService,
  MongooseHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus'

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @HealthCheck()
  check() {
    return this.health.check([async () => this.mongoose.pingCheck('mongodb')])
  }
}
