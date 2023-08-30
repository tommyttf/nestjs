import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
  imports: [ConfigModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
