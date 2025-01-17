import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoLogin {
  private kakaoToken: { [key: string]: string } = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getJWT(
    id: number,
    username: string,
    kakaoId: string,
    profile_image: string,
  ) {
    const user = await this.userKakaoLogin(
      id,
      username,
      kakaoId,
      profile_image,
    );
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async userKakaoLogin(
    id: number,
    username: string,
    kakaoId: string,
    profile_image: string,
  ): Promise<User> {
    let user: User = await this.userRepository.findOne({
      where: { kakaoId: kakaoId },
    });
    const provider = 'kakao';
    if (!user) {
      user = await this.userRepository.create({
        provider: provider,
        id: id,
        name: username,
        kakaoId: kakaoId,
        profile_image: profile_image,
      });
      console.log('새로 생성되었습니다');
      await this.userRepository.save(user);
    } else {
      user.profile_image = profile_image;
      await this.userRepository.save(user);
    }
    return user;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      username: user.name,
      kakaoId: user.kakaoId,
      profile_image: user.profile_image,
    };

    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      username: user.name,
      kakaoId: user.kakaoId,
    };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });

    const saltOrRounds = 10;
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);

    await this.userRepository.update(
      { kakaoId: payload.kakaoId },
      { refresh_token: currentRefreshToken },
    );
    return refreshToken;
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      const kakaoId = decodedRefreshToken.kakaoId;

      const user = await this.userRepository.findOne({ where: { kakaoId } });

      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.kakaoId,
      );
      if (!isRefreshTokenMatching) {
        throw new UnauthorizedException('오류용용');
      }

      const accessToken = this.generateAccessToken(user);

      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('용용이2');
    }
  }

  async logout(cookieInfo: any): Promise<void> {
    const decodedRefreshToken = this.jwtService.verify(
      cookieInfo.kakaoRefreshToken,
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );
    const kakaoId = decodedRefreshToken.kakaoId;
    const user = await this.userRepository.findOne({
      where: { kakaoId: kakaoId },
    });

    user.refresh_token = null;
    await this.userRepository.save(user);
  }
}
