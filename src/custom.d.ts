import { User } from './entities/user';

declare global {
  namespace Express {
    interface Request extends Req {
      user: {
        id: number;
        username: string;
        kakaoId: string;
        profile_image: string;
      };
    }
  }
}
