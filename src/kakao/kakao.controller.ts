import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
    const kakaoAccessToken = req.cookies['kakaoAccessToken'];

    if (kakaoAccessToken) {
      await this.kakaoLogin.revokeKakaoToken(kakaoAccessToken);
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

  @Get('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const newAccessToken = await this.kakaoLogin.refresh(
        req.cookies.refreshToken,
      );
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
      });
      return res.send();
    } catch (error) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      res.clearCookie('isLoggedIn');
      throw new UnauthorizedException('ㅎㅇ');
    }
  }
}
