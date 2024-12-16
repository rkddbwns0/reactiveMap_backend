import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from 'src/entities/bookmark';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async selectBookmark(
    id: number,
    place: string,
  ): Promise<Bookmark | undefined> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    console.log(user);

    const bookmark = await this.bookmarkRepository.findOne({
      where: { place: place },
      relations: ['user'],
    });

    console.log(bookmark);

    if (!bookmark) {
      console.log('즐겨찾기 내역이 없음');
    }

    return bookmark;
  }

  async insertBookmark(id: number, place: string, lon: string, lat: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });

      if (!user) {
        console.log('유저 정보를 찾을 수 없습니다.');
      }

      const bookmarkData = {
        user: user,
        place: place,
        lon: lon,
        lat: lat,
        bookmark_at: new Date(),
      };

      const insertBookmark = await this.bookmarkRepository.create(bookmarkData);

      await this.bookmarkRepository.save(insertBookmark);
      console.log('즐겨찾기 성공');
    } catch (error) {
      console.error(error);
    }
  }

  async deleteBookmark(id: number, place: string, lon: string, lat: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });

      if (!user) {
        console.log('즐겨찾기 정보를 찾을 수 없습니다.');
      }

      const deleteData = {
        user: user,
        place: place,
        lon: lon,
        lat: lat,
      };

      await this.bookmarkRepository.delete(deleteData);

      console.log('즐겨찾기 취소 완료');
    } catch (error) {
      console.error(error);
    }
  }
}
