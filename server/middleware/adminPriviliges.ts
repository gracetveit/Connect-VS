import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.secret !== process.env.JWT) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    next(error);
  }
};
