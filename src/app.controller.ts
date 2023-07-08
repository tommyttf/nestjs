import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/fibonacci')
  async findFibonacci(
    @Query('n') n: string,
    // @Req() request: Request,
  ): Promise<number> {
    const num = Number(n);
    if (isNaN(num)) {
      throw new HttpException('n can only be a number', HttpStatus.BAD_REQUEST);
    }
    if (num < 0) {
      throw new HttpException(
        'n cannot be less then 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appService.getFibonacci(num);

    // console.log(n);
    // return 0;
  }
}
