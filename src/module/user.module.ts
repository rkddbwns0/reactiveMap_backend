import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

// 애플리케이션의 구조를 정의
// 각 db에 대한 모듈을 생성하고 이를 하나로 묶어서 사용하는 형식?
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
