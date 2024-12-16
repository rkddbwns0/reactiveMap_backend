import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordController } from 'src/controller/record.controller';
import { Record } from 'src/entities/record';
import { User } from 'src/entities/user';
import { RecordService } from 'src/service/record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
