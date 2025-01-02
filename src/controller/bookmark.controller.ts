import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  CreateBookmarkDto,
  DeleteBookmarkDto,
  FindBookmarkDto,
  SelectAllBookmarkDto,
} from 'src/dto/bookmark.dto';
import { BookmarkService } from 'src/service/bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('select')
  async selectBookmark(
    @Res() res: Response,
    @Body() selectAllBookmarkDto: SelectAllBookmarkDto,
  ) {
    try {
      const bookmark =
        await this.bookmarkService.selectBookmark(selectAllBookmarkDto);

      res.json(bookmark);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('insert')
  async insertBookmark(
    @Res() res: Response,
    @Body() findBookmarkDto: FindBookmarkDto,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    try {
      const result = await this.bookmarkService.insertBookmark(
        findBookmarkDto,
        createBookmarkDto,
      );

      if (result.success) {
        return res.status(200).json({ success: result.success });
      } else {
        return res.status(200).json({ success: result.success });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @Post('delete')
  async deleteBookmark(
    @Res() res: Response,
    @Body() deleteBoockmarkDto: DeleteBookmarkDto,
  ) {
    try {
      await this.bookmarkService.deleteBookmark(deleteBoockmarkDto);
      console.log('취소 성공공~');
      res.json({ message: '즐겨찾기 실패' });
    } catch (error) {
      console.error(error);
    }
  }
}
