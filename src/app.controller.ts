import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
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
  async findFibonacciPublic(
    @Query('n', ParseIntPipe) n: number,
  ): Promise<number> {
    if (n < 0) {
      throw new HttpException(
        'n cannot be less then 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appService.getFibonacci(n);
  }
  @Get('/fibonacci')
  async findFibonacci(@Query('n', ParseIntPipe) n: number): Promise<number> {
    return this.findFibonacciPublic(n);
  }
}
