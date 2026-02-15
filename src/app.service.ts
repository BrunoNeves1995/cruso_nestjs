import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHelthCheck() {
    return { message: 'API is running' }
  }
}
