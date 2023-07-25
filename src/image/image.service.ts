import { Injectable } from '@nestjs/common';
import { read, MIME_JPEG } from 'jimp';

@Injectable()
export class ImageService {
  pngBufferToJpegBuffer(buffer: Buffer) {
    return read(buffer).then((image) => image.getBufferAsync(MIME_JPEG));
  }
}
