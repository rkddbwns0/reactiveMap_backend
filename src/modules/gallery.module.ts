import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryController } from 'src/controller/gallery.controller';
import { Gallery } from 'src/entities/gallery';
import { User } from 'src/entities/user';
import { GalleryService } from 'src/service/gallery.service';
import { MulterConfigService } from 'src/utils/upload';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Gallery]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
