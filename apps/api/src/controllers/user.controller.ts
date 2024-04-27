import { getUserProfile } from '@/services/user.services';
import { IParsedToken } from '@/types/jwt';
import { Request, Response, NextFunction } from 'express';

export class UserController {
  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user as IParsedToken;
      console.log(req.user);
      const user = await getUserProfile(userId);

      return res.status(200).send({ user });
    } catch (error) {
      next(error);
    }
  }
}
