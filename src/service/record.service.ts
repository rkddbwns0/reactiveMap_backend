import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecordDto, SelectRecordDto } from 'src/dto/record.dto';
import { Record } from 'src/entities/record';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly RecordRepository: Repository<Record>,

    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async selectRecord(input: SelectRecordDto) {
    let user = await this.UserRepository.findOne({ where: { id: input.id } });
    if (!user) {
      console.log('유저 정보를 찾을 수 없습니다.');
    }

    try {
      const recordData = await this.RecordRepository.find({
        where: { user: user },
      });
      return recordData;
    } catch (error) {
      console.error(error);
    }
  }

  async insertRecord(input: CreateRecordDto): Promise<void> {
    let user: User = await this.UserRepository.findOne({
      where: { id: input.id },
    });
    const insertData = {
      user: user,
      ...input,
      write_at: new Date(),
    };
    if (!user) {
      console.log('유저 정보를 찾을 수 없습니다.');
      return;
    }
    const record = await this.RecordRepository.create(insertData);

    await this.RecordRepository.save(record);
  }
}
