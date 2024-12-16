import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { RecordService } from 'src/service/record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordservice: RecordService) {}

  @Post('insert')
  async insertRecord(@Res() res: Response, @Body() body: any) {
    try {
      const { id, place, lat, lon, content } = body;

      await this.recordservice.insertRecord(id, place, lat, lon, content);

      return res.send('ㅎㅇ');
    } catch (error) {
      console.error(error);
    }
  }
}
