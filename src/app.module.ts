import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserModule } from './module/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // env와 같은 환경 변수를 관리하기 위한 라이브러리

@Module({
  imports: [
    ConfigModule.forRoot({
      // env파일을 불러옴
      envFilePath: '../.database.env',
      // 전역으로 해당 환경변수를 활용할 것인가의 여부
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [UserEntity],
        synchronize: true, // 엔티티와 데이터베이스 테이블 자동 동기화 여부 -> 개발모드에서만 사용할 것
        retryAttempts: 5, // 데이터베이스 재연결 시도 횟수
        retryDelay: 3000, // 데이터베이스 재연결 딜레이 시간
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
