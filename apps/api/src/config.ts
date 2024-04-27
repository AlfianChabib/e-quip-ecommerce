import { config } from 'dotenv';
import { resolve } from 'path';
import * as z from 'zod';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';

const envSchema = z.object({
  PORT: z
    .string()
    .refine((val) => !isNaN(Number(val)), 'Must be a number')
    .transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  google: z.object({
    clientID: z.string().trim(),
    clientSecret: z.string().trim(),
    callbackUrl: z.string().url(),
  }),
  baseUrl: z.object({
    api: z.string().url(),
    frontend: z.string().url(),
  }),
  jwt: z.object({
    refresh: z.object({
      secret: z.string().trim(),
      lifetime: z.string().trim(),
    }),
    access: z.object({
      secret: z.string().trim(),
      lifetime: z.string().trim(),
    }),
  }),
  nodemailer: z.object({
    host: z.string().trim(),
    user: z.string().trim(),
    pass: z.string().trim(),
  }),
});

const env = envSchema.safeParse({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  jwt: {
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      lifetime: process.env.JWT_REFRESH_LIFETIME,
    },
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      lifetime: process.env.JWT_ACCESS_LIFETIME,
    },
  },
  baseUrl: {
    api: process.env.BASE_API_URL,
    frontend: process.env.BASE_FRONTEND_URL,
  },
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

if (!env.success) {
  console.log(env.error.issues);
  throw new Error('There is an error with the server environment variables');
}

export const configs = env.data;
