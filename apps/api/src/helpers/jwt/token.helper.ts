import * as jwt from 'jsonwebtoken';
import { configs } from '@/config';
import { IAccessToken, IRefreshToken, TokensPaylaod } from '@/types/jwt';

export const generateAccessToken = (payload: IAccessToken) => {
  return jwt.sign(payload, configs.jwt.access.secret, {
    expiresIn: configs.jwt.access.lifetime,
    algorithm: 'HS256',
  });
};

export const generateRefreshToken = (payload: IRefreshToken) => {
  return jwt.sign(payload, configs.jwt.refresh.secret, {
    expiresIn: configs.jwt.refresh.lifetime,
    algorithm: 'HS256',
  });
};

export const generateTokens = (payload: TokensPaylaod) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, configs.jwt.access.secret, {
      algorithms: ['HS256'],
    }) as IAccessToken;
  } catch (error) {
    throw error;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, configs.jwt.refresh.secret, {
      algorithms: ['HS256'],
    }) as IRefreshToken;
  } catch (error) {
    throw error;
  }
};
