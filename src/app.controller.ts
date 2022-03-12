import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// INSIDE CONTROLLERS PATH IS LOCATED
@Controller('app/hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
