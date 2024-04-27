import { configs } from '@/config';
import { NextFunction, Response } from 'express';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { generateTokens } from '../jwt/token.helper';
import { getUser } from '@/services/user.services';
import { addRefreshToken, createNewUserGoogle, sendRefreshToken } from '@/services/auth.services';
import { User } from '@prisma/client';
import { EmailType, sendEmail } from '../email/email.helper';

export const strategyHelper = async (profile: Profile, done: VerifyCallback) => {
  try {
    const email = profile._json.email;
    const user = await getUser({ type: 'email', email });
    if (!user) {
      const newUser = await createNewUserGoogle({
        email: email!,
        name: profile.displayName,
        picture: profile._json.picture!,
      });
      await sendEmail(EmailType.REGISTERED_NOTIFICATION, { email: newUser.email });
      return done(null, newUser);
    } else {
      return done(null, user);
    }
  } catch (error) {
    throw error;
  }
};

export const callbackHelper = async (user: User, err: Error, res: Response, next: NextFunction) => {
  try {
    if (!user) return res.redirect(`${configs.baseUrl.frontend}/login?error=Social authentication failed`);
    if (err) next(err);

    const { accessToken, refreshToken } = generateTokens({ userId: user.id, email: user.email, role: user.role });
    await addRefreshToken(refreshToken, user.id);
    await sendRefreshToken(res, refreshToken);

    return res.redirect(`${configs.baseUrl.frontend}/login?accessToken=${accessToken}`);
  } catch (error) {
    next(error);
  }
};
