import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateGalleryDto } from 'src/dto/gallery.dto';
import { GalleryService } from 'src/service/gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('insert')
  @UseInterceptors(FilesInterceptor('images'))
  async insertGallery(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createGalleryDto: CreateGalleryDto,
  ) {
    await this.galleryService.insertGallery(createGalleryDto, images);
  }
}
