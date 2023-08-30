import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { read, MIME_JPEG } from 'jimp';
import { cpus } from 'os';
import { join } from 'path';

import WorkerPool from '../workerThread';

@Injectable()
export class ImageService {
  private readonly workerPool: WorkerPool<Buffer, Buffer>;
  constructor(configService: ConfigService) {
    const numThreads = Math.min(
      configService.get('NUM_THREADS') || 1,
      cpus().length,
    );

    this.workerPool = new WorkerPool(
      numThreads,
      join(__dirname, './workerThread/worker.js'),
    );
  }
  pngBufferToJpegBuffer = (buffer: Buffer) =>
    read(buffer).then((image) => image.getBufferAsync(MIME_JPEG));

  pngBufferToJpegBufferByWorker = (buffer: Buffer) =>
    new Promise<Buffer>((resolve, reject) => {
      this.workerPool.runTask(buffer, (err, result) => {
        console.log('worker done, err : ', err);
        if (err) {
          reject(err);
        } else {
          resolve(Buffer.from(result));
        }
      });
    });
}
