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
    try {
      // 유저와 관련된 레코드 데이터를 한 번에 가져오기
      const user = await this.UserRepository.findOne({
        where: { id: input.id },
        relations: ['record'], // record 관계를 로드
      });

      if (!user) {
        console.log('유저 정보를 찾을 수 없습니다.');
        return []; // 빈 배열 반환
      }

      // user.record를 반환 (유저와 연결된 레코드 배열)
      return user.record;
    } catch (error) {
      console.error('selectRecord 함수 오류:', error);
      throw error;
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
