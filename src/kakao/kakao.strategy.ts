import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      callbackURL: `${configService.get('KAKAO_CALLBACK_URL')}`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: CallableFunction,
  ) {
    try {
      const { _json } = profile;
      const user = {
        id: _json.id,
        username: _json.kakao_account.name,
        kakaoId: _json.kakao_account.email,
      };
      done(null, user);
    } catch (error) {
      console.error(error);
    }
  }
}