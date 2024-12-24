import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // env와 같은 환경 변수를 관리하기 위한 라이브러리
import { User } from './entities/user';
import { KakaoModule } from './kakao/kakao.module';
import { KakaoLogin } from './kakao/kakao.service';
import { UserModule } from './modules/user.module';
import { KakaoStrategy } from './kakao/kakao.strategy';
import { JwtModule } from '@nestjs/jwt';
import { KakaoLoginController } from './kakao/kakao.controller';
import { Record } from './entities/record';
import { RecordModule } from './modules/record.module';
import { Bookmark } from './entities/bookmark';
import { BookmarkModule } from './modules/bookmark.module';
import { Gallery } from './entities/gallery';
import { GalleryController } from './controller/gallery.controller';
import { GalleryService } from './service/gallery.service';
import { GalleryModule } from './modules/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // env파일을 불러옴
      envFilePath: '.env',
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
        entities: [User, Record, Bookmark, Gallery],
        synchronize: true, // 엔티티와 데이터베이스 테이블 자동 동기화 여부 -> 개발모드에서만 사용할 것
        retryAttempts: 5, // 데이터베이스 재연결 시도 횟수
        retryDelay: 3000, // 데이터베이스 재연결 딜레이 시간
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    KakaoModule,
    RecordModule,
    BookmarkModule,
    GalleryModule,
  ],
  controllers: [AppController, KakaoLoginController],
  providers: [AppService, KakaoLogin, KakaoStrategy],
})
export class AppModule {}
