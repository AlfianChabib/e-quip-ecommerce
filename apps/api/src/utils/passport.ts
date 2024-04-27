import { configs } from '@/config';
import { strategyHelper } from '@/helpers/auth/social.helper';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';

export const googleStrategy = new GoogleStrategy(
  {
    clientID: configs.google.clientID,
    clientSecret: configs.google.clientSecret,
    callbackURL: configs.google.callbackUrl,
    scope: ['profile', 'email'],
  },
  async (_accessToken, _refreshToken, profile: Profile, done: VerifyCallback) => {
    try {
      strategyHelper(profile, done);
    } catch (error: Error | any) {
      done(null, error);
    }
  },
);

const strategies = { google: googleStrategy };
export default strategies;
