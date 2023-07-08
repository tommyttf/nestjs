import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getFibonacci(n: number): Promise<number> {
    if (n === 0) {
      return 0;
    }
    if (n === 1 || n === 2) {
      return 1;
    }
    const cached = await this.cacheManager.get<number>(`${n}`);
    if (cached !== undefined) {
      console.log(`got cached value for ${n} : ${cached}`);
      return cached;
    }
    const val =
      (await this.getFibonacci(n - 2)) + (await this.getFibonacci(n - 1));
    await this.cacheManager.set(`${n}`, val);
    console.log(`set ${val} as cached value for ${n}`);
    return val;
  }
}
