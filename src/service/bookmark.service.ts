import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateBookmarkDto,
  DeleteBookmarkDto,
  FindBookmarkDto,
  SelectAllBookmarkDto,
} from 'src/dto/bookmark.dto';
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
    input: SelectAllBookmarkDto,
  ): Promise<Bookmark | undefined> {
    const user = await this.userRepository.findOne({ where: { id: input.id } });

    const bookmark = await this.bookmarkRepository.findOne({
      where: { user: user },
      relations: ['user'],
    });

    if (!bookmark) {
      console.log('즐겨찾기 내역이 없음');
    }

    return bookmark;
  }

  async insertBookmark(
    findInput: FindBookmarkDto,
    insertInput: CreateBookmarkDto,
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: insertInput.id },
      });

      if (!user) {
        console.log('유저 정보를 찾을 수 없습니다.');
      }

      const findData = {
        user: { id: user.id },
        place: findInput.place,
        lon: findInput.lon,
        lat: findInput.lat,
      };

      const findUser = await this.bookmarkRepository.findOne({
        where: findData,
      });

      const bookmarkData = {
        user: user,
        ...insertInput,
        bookmark_at: new Date(),
      };

      if (!findUser) {
        const insertBookmark =
          await this.bookmarkRepository.create(bookmarkData);
        await this.bookmarkRepository.save(insertBookmark);
        return { success: true, message: '즐겨찾기 성공' };
      } else {
        await this.bookmarkRepository.delete(findData);
        return { success: false, message: '즐겨찾기 삭제 성공' };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteBookmark(input: DeleteBookmarkDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: input.id },
      });

      if (!user) {
        console.log('즐겨찾기 정보를 찾을 수 없습니다.');
      }

      const deleteUser = await this.bookmarkRepository.delete({
        user: { id: user.id },
        ...input,
      });

      console.log('즐겨찾기 취소 완료');
    } catch (error) {
      console.error(error);
    }
  }
}
