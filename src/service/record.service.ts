import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async insertRecord(
    id: number,
    place: string,
    lat: string,
    lon: string,
    content: string,
  ): Promise<void> {
    let user: User = await this.UserRepository.findOne({ where: { id: id } });
    const insertData = {
      user: user,
      place,
      lat,
      lon,
      content,
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
