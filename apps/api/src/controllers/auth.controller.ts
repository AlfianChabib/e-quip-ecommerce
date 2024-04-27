import { callbackHelper } from '@/helpers/auth/social.helper';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export class AuthController {
  async registerEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
    } catch (error) {
      next(error);
    }
  }

  async googleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      passport.authenticate('google', async (err: Error, user: User) => {
        callbackHelper(user, err, res, next);
      })(req, res);
    } catch (error) {
      next(error);
    }
  }
}
