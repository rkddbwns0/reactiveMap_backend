import {
  Controller,
  Get,
  HttpCode,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { KakaoLogin } from './kakao.service';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class KakaoLoginController {
  constructor(
    private readonly kakaoLogin: KakaoLogin,
    private readonly configService: ConfigService,
  ) {}

  @Get('callback')
  @UseGuards(AuthGuard('kakao'))
  @HttpCode(301)
  async getKakaoInfo(@Res() res: Response, @Req() req: Request) {
    try {
      const { accessToken, refreshToken } = await this.kakaoLogin.getJWT(
        req.user.id,
        req.user.username,
        req.user.kakaoId,
        req.user.profile_image,
      );

      res.cookie('accessToken', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      res.cookie('isLoggedIn', true, { httpOnly: false });
      res.redirect('http://localhost:5173/');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  }

  @Get('user-info')
  @UseGuards(AuthGuard('jwt'))
  async userInfo(@Req() req: Request, @Res() res: Response) {
    return res.json(req.user);
  }

  @Get('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res: Response) {
    const cookieInfo = {
      kakaoAccessToken: req.cookies['accessToken'],
      kakaoRefreshToken: req.cookies['refreshToken'],
      LoggedIn: req.cookies['isLoggedIn'],
    };

    if (cookieInfo) {
      await this.kakaoLogin.logout(cookieInfo);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('isLoggedIn');
    res.redirect('http://localhost:5173/');
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  get(@Req() req: Request) {
    return 'JWT 인증 성공';
  }
}
