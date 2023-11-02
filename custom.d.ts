// custom.d.ts
import { NextApiRequest } from 'next';

declare global {
  namespace Express {
    interface Request {
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
}

export {};