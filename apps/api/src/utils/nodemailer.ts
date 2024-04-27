import { configs } from '@/config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: configs.nodemailer.host,
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: configs.nodemailer.user,
    pass: configs.nodemailer.pass,
  },
});
