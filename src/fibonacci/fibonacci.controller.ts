import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { FibonacciService } from './fibonacci.service';
import { Public } from '../decorator/public.decorator';
import { FibonacciDto } from './dto/fibonacci.dto';

@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly fibonacciService: FibonacciService) {}

  /**
   * e.g. /fibonacci/public?n=10
   */
  @Public()
  @Get('/public')
  async findFibonacciPublic(@Query() { n }: FibonacciDto): Promise<number> {
    if (n < 0) {
      throw new HttpException(
        'n cannot be less then 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.fibonacciService.getFibonacci(n);
  }

  /**
   * e.g. /fibonacci/10
   */
  @Get(':n')
  async findFibonacci(@Param() params: FibonacciDto) {
    return this.findFibonacciPublic(params);
  }

  /**
   * e.g. /fibonacci/public/10
   */
  @Public()
  @Get('/public/:n')
  findOne(@Param() params: FibonacciDto) {
    return this.findFibonacciPublic(params);
  }
}
