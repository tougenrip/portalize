// types/next-extended.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    };
  }
}
