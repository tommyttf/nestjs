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

@Controller('image')
export class ImageController {
  @Post('uploadPng')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
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
}
