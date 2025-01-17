import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateRecordDto, SelectRecordDto } from 'src/dto/record.dto';
import { RecordService } from 'src/service/record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordservice: RecordService) {}

  @Post('select')
  async selectRecord(
    @Res() res: Response,
    @Body() selectRecordDto: SelectRecordDto,
  ) {
    try {
      const result = await this.recordservice.selectRecord(selectRecordDto);
      console.log(result);
      return res.json(result);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('insert')
  async insertRecord(
    @Res() res: Response,
    @Body() createRecordDto: CreateRecordDto,
  ) {
    try {
      await this.recordservice.insertRecord(createRecordDto);

      return res.send('ㅎㅇ');
    } catch (error) {
      console.error(error);
    }
  }
}
