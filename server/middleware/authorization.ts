import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../db/auth';

export default async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await verifyToken(req.headers.authorization as string);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
