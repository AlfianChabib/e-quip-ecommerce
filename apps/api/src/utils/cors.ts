import { configs } from '@/config';
import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: [configs.baseUrl.frontend],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
