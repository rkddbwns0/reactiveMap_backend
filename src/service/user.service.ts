import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';

// 비즈니스 로직을 처리하는 부분
// Controller에서 받은 요청을 처리하는 부분 -> db에 데이터를 저장하거나 불러오는 등의 역할을 실질적으로 수행하는 부분
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, password: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, password);
    return password;
  }
}
