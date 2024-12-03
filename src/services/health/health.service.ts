import { Injectable } from "@nestjs/common";
import { HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) { }

  async getHealthStatus() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}