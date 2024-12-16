import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BookmarkService } from 'src/service/bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('select')
  async selectBookmark(@Res() res: Response, @Body() body: any) {
    try {
      const { id, place } = body;

      const bookmark = await this.bookmarkService.selectBookmark(id, place);

      res.json(bookmark);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('insert')
  async insertBookmark(@Res() res: Response, @Body() body: any) {
    try {
      const { id, place, lon, lat } = body;

      await this.bookmarkService.insertBookmark(id, place, lon, lat);
      console.log('즐겨찾기 성공공~');
      res.json({ message: '즐겨찾기 성공' });
    } catch (error) {
      console.error(error);
    }
  }

  @Post('delete')
  async deleteBookmark(@Res() res: Response, @Body() body: any) {
    try {
      const { id, place, lon, lat } = body;

      await this.bookmarkService.deleteBookmark(id, place, lon, lat);
      console.log('취소 성공공~');
      res.json({ message: '즐겨찾기 실패' });
    } catch (error) {
      console.error(error);
    }
  }
}
