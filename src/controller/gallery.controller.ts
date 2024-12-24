import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GalleryService } from 'src/service/gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('insert')
  @UseInterceptors(FilesInterceptor('images'))
  async insertGallery(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
    const { id, place, lon, lat } = body;
    await this.galleryService.insertGallery(id, place, lon, lat, images);
  }
}
