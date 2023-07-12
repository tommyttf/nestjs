import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FibonacciService {
  private maxLimit = -1;
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getFibonacci(n: number): Promise<number> {
    if (n === 0) {
      return 0;
    }
    if (n === 1 || n === 2) {
      return 1;
    }
    if (this.maxLimit !== -1 && n >= this.maxLimit) {
      throw new HttpException(
        `reach positive infinity at ${this.maxLimit}, please provide n less than it`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const cached = await this.cacheManager.get<number>(`${n}`);
    if (cached !== undefined) {
      console.log(`got cached value for ${n} : ${cached}`);
      return cached;
    }
    const val =
      (await this.getFibonacci(n - 2)) + (await this.getFibonacci(n - 1));
    if (val == Number.POSITIVE_INFINITY) {
      this.maxLimit = n;
      throw new HttpException(
        `reach positive infinity at ${n}, please provide n less than it`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    await this.cacheManager.set(`${n}`, val);
    console.log(`set ${val} as cached value for ${n}`);
    return val;
  }
}
