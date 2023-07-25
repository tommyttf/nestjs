import { IsNumberString } from 'class-validator';

export class FibonacciDto {
  @IsNumberString()
  n: number;
}
