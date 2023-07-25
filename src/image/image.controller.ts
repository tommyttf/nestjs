import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('uploadPng')
  @UseInterceptors(FileInterceptor('file'))
  uploadPng(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(file);
    res.contentType('image/png').send(file.buffer);
  }

  @Post('pngToJpg')
  @UseInterceptors(FileInterceptor('file'))
  async pngToJpg(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(file);
    res
      .contentType('image/jpeg')
      .send(await this.imageService.pngBufferToJpegBuffer(file.buffer));
  }
}
