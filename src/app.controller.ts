import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/fibonacciPublic')
  async findFibonacciPublic(@Query('n') n: number): Promise<number> {
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
  }
  @Get('/fibonacci')
  async findFibonacci(@Query('n') n: number): Promise<number> {
    return this.findFibonacciPublic(n);
  }
}
