import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGalleryDto } from 'src/dto/gallery.dto';
import { Gallery } from 'src/entities/gallery';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly GalleryRepository: Repository<Gallery>,

    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async selectGallery(id: number, place: string): Promise<Gallery | undefined> {
    let user = await this.GalleryRepository.findOne({
      where: { place: place },
      relations: ['user'],
    });

    return user;
  }

  async insertGallery(
    input: CreateGalleryDto,
    images: Express.Multer.File[],
  ): Promise<void> {
    let user = await this.UserRepository.findOne({ where: { id: input.id } });

    const image = `/${images[0].filename}`;
    console.log(images);

    const insertData = {
      ...input,
      images: image,
      upload_at: new Date(),
    };

    if (user) {
      const insertGallery = await this.GalleryRepository.create(insertData);
      await this.GalleryRepository.save(insertGallery);
    }
  }
}
