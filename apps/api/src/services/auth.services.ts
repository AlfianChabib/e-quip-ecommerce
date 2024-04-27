import { configs } from '@/config';
import { hashToken } from '@/helpers/crypto/hashToken.helper';
import prisma from '@/prisma';
import { Response } from 'express';

interface IGoogleUserPayload {
  email: string;
  name: string;
  picture: string;
}

export const createNewUserGoogle = async (payload: IGoogleUserPayload) => {
  try {
    return await prisma.user.create({
      data: {
        email: payload.email,
        username: payload.name,
        profile: { create: { image: payload.picture } },
        authInfo: {
          create: { authType: 'Social', socialAuth: { create: { email: payload.email, provider: 'Google' } } },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const addRefreshToken = async (refreshToken: string, userId: number) => {
  try {
    const hashedToken = hashToken(refreshToken);
    return await prisma.user.update({
      where: { id: userId },
      select: { id: true },
      data: {
        authInfo: { update: { data: { refreshToken: { create: { hashedToken: hashedToken } } } } },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const sendRefreshToken = async (res: Response, refreshToken: string) => {
  return res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: configs.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: true,
    path: '/',
  });
};
