import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelthCheck() {
    return this.appService.getHelthCheck()
  }
}
